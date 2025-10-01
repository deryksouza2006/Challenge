import logo from "../assets/images/logo.png";
export default function Header() {
  return (
    <header className="bg-[#23C8AA] text-white px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className=" rounded-full flex items-center justify-center">
            <img className="w-20 h-15"src={logo} alt="Logo Visuall" />
          </div>
        </div>
      </div>
    </header>
  );
}
