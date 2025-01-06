export default function Footer() {
  return (
    <div>
      <footer className="footer text-base-content bg-[#EBF9E2] p-10">
        <nav>
          <h6 className="footer-title">We're BeautyGalore</h6>
          <a href="/services" className="link link-hover">
            Services
          </a>
          <a href="/products" className="link link-hover">
            Products
          </a>
          <a href="/courses" className="link link-hover">
            Courses
          </a>
          <a href="/book" className="link link-hover">
            Booking
          </a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a href="/aboutus" className="link link-hover">
            About us
          </a>
          <a className="link link-hover">Contact</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <nav>
          <h6 className="footer-title">Contact Us</h6>
          <a className="link link-hover">Lakeside, Pokhara, Nepal</a>
          <a className="link link-hover">977 9867734327</a>q
          <a className="link link-hover">BeautyGalore18@gmail.com</a>
        </nav>
      </footer>
      <div>
        <footer className="footer footer-center bg-base-300 text-base-content p-4">
          <aside>
            <p>
              Copyright © {new Date().getFullYear()} - All right reserved by
              Beauty Galore Salon
            </p>
          </aside>
        </footer>
      </div>
    </div>
  );
}
