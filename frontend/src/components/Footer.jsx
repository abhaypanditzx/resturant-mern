export default function Footer() {
    return (
        <div className="pt-16">
            <footer className="bg-stone-950 text-stone-400 py-16 px-6 md:px-16 lg:px-24 xl:px-32 border-t border-stone-800">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <h2 className="text-3xl font-light text-stone-100" style={{ fontFamily: 'Georgia, serif' }}>
                                Maison <span className="italic text-amber-500">M</span>
                            </h2>
                        </div>
                        <p className="text-sm leading-relaxed max-w-sm">
                            A culinary journey blending traditional flavors with modern elegance. Experience dining that delights all the senses.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-stone-100 font-medium tracking-[0.2em] uppercase text-xs mb-6">Explore</h3>
                        <ul className="space-y-4">
                            <li><a href="/menu" className="text-sm hover:text-amber-500 transition-colors duration-200">Our Menu</a></li>
                            <li><a href="/book-table" className="text-sm hover:text-amber-500 transition-colors duration-200">Reservations</a></li>
                            <li><a href="/my-orders" className="text-sm hover:text-amber-500 transition-colors duration-200">Order Online</a></li>
                            <li><a href="/contact" className="text-sm hover:text-amber-500 transition-colors duration-200">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-stone-100 font-medium tracking-[0.2em] uppercase text-xs mb-6">Visit Us</h3>
                        <ul className="space-y-4">
                            <li className="text-sm flex flex-col">
                                <span className="font-medium text-stone-300 mb-1">Address</span>
                                24 Rue de la Paix<br />New York, NY 10001
                            </li>
                            <li className="text-sm flex flex-col pt-2">
                                <span className="font-medium text-stone-300 mb-1">Contact</span>
                                <a href="tel:+12125550123" className="hover:text-amber-500 transition-colors duration-200">+1 (212) 555-0123</a>
                                <a href="mailto:hello@maison.com" className="hover:text-amber-500 transition-colors duration-200">hello@maison.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h3 className="text-stone-100 font-medium tracking-[0.2em] uppercase text-xs mb-6">Hours</h3>
                        <ul className="space-y-3 px-4 py-5 border border-stone-800 rounded-lg bg-stone-900/50">
                            <li className="flex justify-between text-sm">
                                <span className="text-stone-500">Mon - Thu</span>
                                <span className="text-stone-300">5:00 PM - 10:00 PM</span>
                            </li>
                            <li className="flex justify-between text-sm border-t border-stone-800/60 pt-3">
                                <span className="text-stone-500">Fri - Sat</span>
                                <span className="text-stone-300">5:00 PM - 11:30 PM</span>
                            </li>
                            <li className="flex justify-between text-sm border-t border-stone-800/60 pt-3">
                                <span className="text-stone-500">Sunday</span>
                                <span className="text-stone-300">4:00 PM - 9:00 PM</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Copyright Bar */}
                <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-stone-600">
                        © {new Date().getFullYear()} Maison Restaurant. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-xs text-stone-600 hover:text-stone-300 transition-colors">Privacy Policy</a>
                        <a href="#" className="text-xs text-stone-600 hover:text-stone-300 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};