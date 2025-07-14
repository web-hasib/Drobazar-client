import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
{
question: "How long does delivery take?",
answer: "Delivery typically takes 2–5 business days based on your location and product availability.",
},
{
question: "Do you offer home delivery in rural areas?",
answer: "Yes, we deliver to most rural areas across Bangladesh through our logistics partners.",
},
{
question: "What payment methods are available?",
answer: "We accept bKash, Nagad, Rocket, Visa/MasterCard, and cash on delivery.",
},
{
question: "Is my payment information safe?",
answer: "Yes, we use secure payment gateways with SSL encryption to protect your data.",
},
{
question: "Can I return a product after delivery?",
answer: "Yes, returns are accepted within 7 days if the item is unused and in original condition.",
},
{
question: "How do I become a vendor on Dorbazar?",
answer: "You can apply by signing up and submitting your vendor details from the Vendor Dashboard.",
},
{
question: "How are advertisements reviewed?",
answer: "All ads go through manual admin approval to ensure they meet our content guidelines.",
},
{
question: "Where can I see my advertisement requests?",
answer: "You can view and manage your advertisement requests from the 'My Advertisements' page in your dashboard.",
},
{
question: "How do I track my order?",
answer: "Go to 'My Orders' in your profile to view real-time status updates of your deliveries.",
},
{
question: "What if my product is damaged on arrival?",
answer: "You can request a return or replacement within 48 hours of delivery with photo proof.",
}
];

const FAQSection = () => {
const [openIndex, setOpenIndex] = useState(null);

const toggle = (index) => {
setOpenIndex(openIndex === index ? null : index);
};

const getAnimation = (index) => {
return {
hidden: { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
visible: { opacity: 1, x: 0 },
};
};

return (
<section className="py-16 px-4 max-w-7xl  mx-auto bg-base-100 text-base-content rounded-xl">
<h2 className="text-3xl font-bold text-center text-lime-400 mb-12">
Frequently Asked Questions
</h2>


  <div className="space-y-5 m-4">
    {faqData.map((faq, index) => {
      const isOpen = openIndex === index;

      return (
        <motion.div
          key={faq.question}
          variants={getAnimation(index)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="border border-lime-300/10 rounded-xl overflow-hidden bg-lime-200/5 shadow-sm"
        >
          <button
            className="w-full flex justify-between items-center font-semibold px-4 py-3 text-left text-base-content focus:outline-none"
            onClick={() => toggle(index)}
          >
            {faq.question}
            <span className="text-xl">{isOpen ? "−" : "+"}</span>
          </button>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-4 py-2 text-sm text-base-content/60">{faq.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    })}
  </div>
</section>
);
};

export default FAQSection;