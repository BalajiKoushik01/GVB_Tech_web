import type {Metadata} from "next";
import Link from "next/link";
export const metadata:Metadata={title:"Privacy Notice | GVB Tech Solutions",description:"How GVB Tech Solutions handles enquiries and website information."};
export default function Privacy(){return <article className="mx-auto max-w-3xl px-6 py-24 text-slate-200 leading-8">
<p className="text-sm uppercase tracking-widest text-sky-300">GVB Tech Solutions</p><h1 className="my-8 text-4xl font-semibold text-white">Privacy notice</h1>
<p>We respect your privacy. This notice explains the information you may provide when contacting us through this website.</p>
<h2 className="mt-10 mb-3 text-2xl text-white">Information you submit</h2><p>When you use the contact form, we may collect your name, email address, phone number if provided, selected service and enquiry message to respond to your request. Please do not include sensitive personal information in messages.</p>
<h2 className="mt-10 mb-3 text-2xl text-white">Website analytics and chat</h2><p>We use website performance and analytics services to understand site reliability and usage. If you use the AI chat, your submitted message may be processed by an external AI provider to generate a reply. Do not submit confidential information in chat.</p>
<h2 className="mt-10 mb-3 text-2xl text-white">Storage and security</h2><p>Enquiries may be stored using service providers that support our website. We apply technical safeguards, but no online service can guarantee absolute security. Access and retention are managed according to business needs and applicable law.</p>
<h2 className="mt-10 mb-3 text-2xl text-white">Your choices</h2><p>You can contact us to ask questions about information you have provided, or request correction or deletion where applicable. Essential website functionality does not require accepting marketing cookies.</p>
<h2 className="mt-10 mb-3 text-2xl text-white">Contact</h2><p>Email <a className="underline text-sky-300" href="mailto:info@gvbtech.in">info@gvbtech.in</a>. GVB Tech Solutions, Madanapalle, Andhra Pradesh.</p>
<p className="mt-12 text-sm text-slate-400">This is a general website notice and should be reviewed against actual hosting, analytics, retention and applicable legal requirements before production release.</p><Link href="/" className="mt-8 inline-block underline text-sky-300">Back to homepage</Link>
</article>}
