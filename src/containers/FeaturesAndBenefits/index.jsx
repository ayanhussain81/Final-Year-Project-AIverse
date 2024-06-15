import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaCogs, FaDollarSign, FaHeadset } from 'react-icons/fa';

const features = [
  {
    title: 'Diverse Selection of AI Models',
    description: 'Access a wide range of AI models across various domains and applications.',
    icon: <FaBrain className=" text-700 mb-4 mx-auto" />,
  },
  {
    title: 'Easy Integration',
    description: 'Seamlessly integrate AI models into your existing systems with our user-friendly API.',
    icon: <FaCogs className=" text-700 mb-4 mx-auto" />,
  },
  {
    title: 'Affordable Pricing',
    description: 'Choose from flexible pricing plans that suit your budget and requirements.',
    icon: <FaDollarSign className=" text-700 mb-4 mx-auto" />,
  },
  {
    title: 'Expert Support',
    description: 'Get assistance from AI experts to ensure successful deployment and usage.',
    icon: <FaHeadset className=" text-700 mb-4 mx-auto" />,
  },
];

const FeaturesAndBenefits = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
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

  const itemVariants = {
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

  return (
    <section className="bg-neutral-200 tablet:px-10 laptop:px-20 py-20 laptop:py-28 font-['Montserrat',_sans-serif]">
      <motion.div
        className="container"
        initial="hidden"
        whileInView="visible"
        // animate="visible"
        variants={containerVariants}
      >
        <motion.h2
          whileInView="visible"
          className="text-800 font-bold font-['Montserrat',_sans-serif] mb-10"
          variants={itemVariants}
        >
          Why Choose AIVerse?
        </motion.h2>
        <div className="grid gap-8 mobile-sm:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center" variants={itemVariants}>
              {feature.icon}
              <h3 className=" text-600 mb-2 font-bold">{feature.title}</h3>
              <p className="text-neutral-600 text-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturesAndBenefits;
