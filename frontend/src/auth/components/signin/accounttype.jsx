const AccountType = ({ accountType, setAccountType }) => {
  return (
    <div className="account-type">

      <button
        type="button"
        className={accountType === "vendor" ? "active" : ""}
        onClick={() => setAccountType("vendor")}
      >
        I’m vendor
      </button>

      <button
        type="button"
        className={accountType === "user" ? "active" : ""}
        onClick={() => setAccountType("user")}
      >
        I’m user
      </button>

    </div>
  );
};
  
export default AccountType;