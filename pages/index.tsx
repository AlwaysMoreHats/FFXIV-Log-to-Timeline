import Head from 'next/head'
import Link from 'next/link'
import LogLinkInput from '../components/LogLinkInput'
import { useState } from 'react'
import EventsCsvInput from '../components/EventsCsvInput'
import EventsTable from '../components/EventsTable'

export default function Home() {
  // const [fflogsUrl, setfflogsUrl] = useState('')
  const [eventsCsv, setEventsCsv] = useState('')
  return (
    <div className="bg-slate-400 max-w-6xl ml-auto mr-auto min-h-full">
      <Head>
        <title>FFXIV Log to Parser</title>
      </Head>
      <EventsCsvInput onChange={setEventsCsv}/>
      <EventsTable rawCsv={eventsCsv} />
    </div>
  )
}
