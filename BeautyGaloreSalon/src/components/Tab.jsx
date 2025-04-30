import CustomerRegisterForm from "./CustomerRegisterForm";
// Removed StaffRegisterForm import

export default function Tab() {
  return (
    <div role="tablist" className="tabs tabs-lifted mt-2 mb-2">
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
