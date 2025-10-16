type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ClickerButton(props: Props) {
  return <button {...props}>{props.children}</button>;
}
