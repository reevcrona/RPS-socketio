import { useSocketEmitters } from "../hooks/useSocketEmitters";

type UserNameComponentProps = {
  setShowUsernameLightbox: React.Dispatch<React.SetStateAction<boolean>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    setterFunc: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  userName: string;
};

function UserNameComponent({
  handleChange,
  setShowUsernameLightbox,
  setUserName,
  userName,
}: UserNameComponentProps) {
  const { sendUserData } = useSocketEmitters();
  const handleSetUsername = async () => {
    try {
      const response = await sendUserData(userName);
      if (response.message) console.log(response.message);
      setShowUsernameLightbox(false);
    } catch (error) {
      console.error("Failed to update socket data", error);
    }
  };

  return (
    <>
      <form className="bg-white flex p-2 min-h-[200px] justify-evenly flex-col w-full max-w-[300px]">
        <label htmlFor="userName">User name</label>
        <input
          className="border border-black"
          type="text"
          id="userName"
          value={userName}
          placeholder="Please select a user name"
          name="userName"
          autoComplete="new-username"
          onChange={(e) => handleChange(e, setUserName)}
        />
        <button
          type="button"
          className="bg-black text-white"
          onClick={handleSetUsername}
        >
          Accept
        </button>
      </form>
    </>
  );
}

export default UserNameComponent;
