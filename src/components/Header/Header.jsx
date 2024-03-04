import SelectUser from "../SelectUser/SelectUser";
import "./Header.css";

function Header({ changedUser }) {
  const changeUser = (e) => {
    changedUser(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <img className="logo" src="/logo.svg" alt="Logo of journal" />
      <SelectUser changeUser={changeUser} />
    </>
  );
}

export default Header;
