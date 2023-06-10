type Props = {
    onChange: (url: string) => void;
  }
  
  export default function EventsCsvInput({ onChange }: Props) {
    return (
      <textarea className="w-96 h-72" onChange={e => onChange(e.target.value)} name="fflogs-csv" />
    )
  }