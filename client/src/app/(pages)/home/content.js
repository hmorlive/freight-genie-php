import {
  faGear,
  faHeadset,
  faMobile,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import QuoteForm from "./quote-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
export default function HomePageContent() {
  return (
    <>
      <QuoteForm />
      <section className="section">
        <h1 className="mb-4">
          Why <span className="text-sky-600">FreightGenie</span>
        </h1>
        <p>
          FreightGenie is a full-service logistics company that provides
          innovative solutions to the most complex supply chain challenges. We
          deliver value to our customers through our extensive network of
          carriers, advanced technology, and experienced team of professionals.
        </p>
        <div className="w-full flex gap-2 flex-wrap flex-col xl:flex-row items-center justify-center my-10 p-4">
          <IconCard
            icon={faTruck}
            title="Fast Delivery"
            description="We deliver your goods on time, every time."
          />
          <IconCard
            icon={faHeadset}
            title="24/7 Support"
            description="Our team is available around the clock to assist you."
          />
          <IconCard
            icon={faMobile}
            title="Mobile App"
            description="Track your shipments on the go with our mobile app."
          />
          <IconCard
            icon={faGear}
            title={"Advanced Technology"}
            description="Our technology ensures that your goods are delivered safely."
          />
        </div>
        <p>
          You can rest easy knowing that your goods are in good hands with
          FreightGenie.
        </p>
      </section>
      <section className="section">
        <h2 className="mb-3">Looking to <span className="text-sky-600">track</span> your order?</h2>
        <p>
          You can track your loads or quote request <Link href="/track" className="text-sky-700 font-bold underline">here</Link>
          </p>
      </section>
    </>
  );
}

function IconCard({ icon, title, description }) {
  if (!icon || !title || !description) return null;
  return (
    <div className="flex items-center justify-center gap-2 p-1 rounded-md w-fit max-w-72">
      <FontAwesomeIcon icon={icon} size="2x" className="text-sky-600" />
      <div className="flex flex-col">
        <h3>{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
