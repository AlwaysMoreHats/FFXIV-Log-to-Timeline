import Head from 'next/head'
import Link from 'next/link'
import LogLinkInput from '../components/LogLinkInput'
import { useState } from 'react'
import EventsCsvInput from '../components/EventsCsvInput'

export default function Home() {
  // const [fflogsUrl, setfflogsUrl] = useState('')
  const [eventsCsv, setEventsCsv] = useState('')
  console.log(eventsCsv)
  return (
    <div className="bg-slate-400 max-w-6xl ml-auto mr-auto h-full">
      <Head>
        <title>FFXIV Log to Parser</title>
      </Head>
      <EventsCsvInput onChange={setEventsCsv}/>
    </div>
  )
}
