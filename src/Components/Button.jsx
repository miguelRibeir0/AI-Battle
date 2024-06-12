//eslint-disable-next-line
const Button = ({ text, onClick }) => {
  return (
    <button
      className="mt-5 w-1/6 rounded border-2 border-lime-500 py-2 text-white shadow-lime-500 transition duration-200 ease-in-out hover:bg-lime-500"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
