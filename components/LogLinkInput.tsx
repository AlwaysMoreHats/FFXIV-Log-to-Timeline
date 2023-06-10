type Props = {
  onChange: (url: string) => void;
}

export default function LogLinkInput({ onChange }: Props) {
  return (
    <input type="url" onChange={e => onChange(e.target.value)} name="fflogs-link" />
  )
}