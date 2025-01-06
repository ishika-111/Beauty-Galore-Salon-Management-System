import CustomerRegisterForm from "./CustomerRegisterForm";
import CustomerLoginForm from "./CustomerRegisterForm";
import StaffRegisterForm from "./StaffRegisterForm";

export default function Tab() {
  return (
    <div role="tablist" className="tabs tabs-lifted">
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab"
        aria-label="Staff"
      />
      <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box p-6"
      >
        <StaffRegisterForm />
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab"
        aria-label="Customer"
        defaultChecked
      />
      <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box p-6"
      >
        <CustomerRegisterForm />
      </div>


      
    </div>
  );
}
