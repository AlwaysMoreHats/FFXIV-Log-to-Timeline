import msToSecDisplay from "../lib/msToTimeDisplay";
import parseRawCsv from "../lib/parseRawCsv";

type Props = {
  rawCsv?: string;
}

export default function EventsTable({ rawCsv }: Props) {
  if (!rawCsv) {
    return null
  }

  const data = parseRawCsv(rawCsv)

  if (!data.length) {
    return null
  }
  
  return (
    <table>
      <thead>
        <tr>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Ability Name</th>
          <th>Targets</th>
        </tr>
      </thead>
      <tbody>
          {data.map(d => (
            <tr key={`${d.startTime} ${d.abilityName}`}>
              <td>{msToSecDisplay(d.startTime)}</td>
              <td>{d.startTime === d.endTime ? null : msToSecDisplay(d.endTime)}</td>
              <td>{d.abilityName}</td>
              <td>{d.targets}</td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}