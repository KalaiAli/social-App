export default function Profile(props) {
  console.log(props.children)
  return <div>
    Profile
    {props.children}
  </div>;
}
