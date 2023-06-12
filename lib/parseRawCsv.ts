import Papa from 'papaparse'

export const EXPECTED_FIELDS = [
  "Time",
  "Ability",
  "Source → Target",
] as const

export type ParsedHeaders = typeof EXPECTED_FIELDS[number]

export type AbilityData = {
  startTime: number; // in ms
  endTime: number; //in ms
  abilityName: string;
  target: string;
  targets: number;
}

function rawCsvToDataArray(rawCsv: string): Record<ParsedHeaders, string>[] {
  const { data, errors } = Papa.parse<Record<ParsedHeaders, string>>(rawCsv, {header: true})

  if (errors.length) {
    console.error(errors)
    return []
  }

  return data
}

// mm:ss.ms => ms
function parseTimeStamp(timeStamp: string): number {
  const [match, minStr = '0', secStr = '0', msStr = '0'] = timeStamp.match(/^(\d?\d)?:?(\d?\d)\.(\d+)$/)
  if (!match) {
    return -1
  }

  return parseInt(minStr, 10) * 60 * 1000 + parseInt(secStr, 10) * 1000 + parseInt(msStr, 10)
}

function transformData(data: Record<ParsedHeaders, string>): AbilityData {
  const time = data.Time
  const ability = data.Ability
  const sourceTarget = data['Source → Target']

  const startTime = parseTimeStamp(time)
  const [, abilityName, abiiltyDuration = '0.0'] = ability.match(/^(.+?)(?:(\d\.\d\d)(?: sec))?$/)
  console.log(parseTimeStamp(abiiltyDuration))
  const endTime = startTime + parseTimeStamp(abiiltyDuration);
  const [,target = "N/A"] = sourceTarget.split(' → ')

  return {
    startTime,
    endTime,
    abilityName,
    target,
    targets: 1,
  }

}

function filterData(data: AbilityData[]): AbilityData[] {
  const noAttackData = data.filter(d => d.abilityName !== 'attack')
  return noAttackData
  // rethink this: probbalby filter based on if an attack with the same name exists with the same timestamp
  // If there's an ability that shows multiple times in a row, then take the LATEST end Time
  const filteredData: AbilityData[] = []
  let lastValue: AbilityData = noAttackData[0];
  noAttackData.forEach(d => {
    if (lastValue === d) {
      filteredData.push(d)
      return
    }

    if (d.abilityName !== lastValue.abilityName) {
      filteredData.push(d)
      lastValue = d
    } else if (d.target !== 'N/A' && lastValue.target !== 'N/A') {
      lastValue.target += ' ' + d.target
      lastValue.targets += 1
    }
  })

  return filteredData
}

export default function parseRawCsv(rawCsv: string) {
  const data = rawCsvToDataArray(rawCsv)
  const transformedData = data.map(transformData)
  const filteredData = filterData(transformedData)

  return filteredData
}