import DropdownContainer from "../dropdown-container";
export default function HeaderContainer() {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-md p-4 w-[480px]">
        <div className="container mx-auto flex justify-between items-center">
          <h1 onClick={() => window.location.href = "/"} className="text-xl font-bold text-blue-500 dark:text-white group cursor-pointer">Sanber Daily</h1>
          <DropdownContainer />
        </div>
      </header>
    );
}