import { motion } from 'framer-motion';
import { FaStopwatch } from 'react-icons/fa6';
import { FaBrain } from 'react-icons/fa';

const containerVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1,
      delay: 0.3,
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
};

const childrenVariant = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1,
    },
  },
};

export default function Banner() {
  return (
    <section aria-label="Banner section" className="bg-neutral-200">
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        className="container tablet:px-10 laptop:px-20 | py-20 laptop:py-28"
      >
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-14 max-tablet:max-w-sm max-tablet:mx-auto">
          <h2 className="text-800 text-neutral-900 font-bold font-['Montserrat',_sans-serif] leading-tight tablet:max-laptop:col-span-2 tablet:max-laptop:max-w-lg max-tablet:text-center">
            Explore groundbreaking AI innovations.
          </h2>

          {[
            {
              img: <FaStopwatch size={30} />,
              title: 'Unmatched Efficiency',
              description: 'Streamline tasks and enhance productivity with our AI solutions, saving time and resources.',
            },
            {
              img: <FaBrain size={30} />,
              title: 'Enhanced Decision-Making',
              description:
                'Leverage powerful AI insights to make informed decisions, optimizing outcomes and driving success.',
            },
          ].map(({ img, title, description }, index) => (
            <motion.div variants={childrenVariant} key={index} className="flex gap-4">
              <div>{img}</div>

              <div className="space-y-3">
                <h3 className="text-600 font-bold leading-tight">{title}</h3>
                <p className="text-neutral-600 leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
