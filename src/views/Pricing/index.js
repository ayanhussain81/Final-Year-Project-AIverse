import React, { useEffect, useState } from 'react';
import PlanCard from './components/PlanCard';
import TogglePlan from './components/TogglePlan';
import axiosInstance from 'services/axiosInstance';
import PlanCardSkeleton from './components/PlanCardSkeleton';
import Header from 'layouts/HomeHeader';

const Pricing = () => {
  const [billPlan, setBillPlan] = useState('monthly');
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleBillingPlan = () => {
    setBillPlan((prevPlan) => (prevPlan === 'monthly' ? 'yearly' : 'monthly'));
  };

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get('/plan');
      if (data?.plans) {
        const plansGroupedByPeriod = Object.groupBy(data.plans, ({ billingPeriod }) => billingPeriod);
        console.log({ data: plansGroupedByPeriod });
        setSubscriptions(plansGroupedByPeriod);
      } else throw Error();
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <>
      <Header />
      <main class="mx-4 my-32">
        <div class="text-center">
          <h1 class="mb-4 text-600 font-normal tablet:text-800 laptop:text-900">
            Our <span class="font-semibold">plans</span> for your <span class="font-semibold">strategies</span>
          </h1>
          <p class="text-sm font-normal text-inherit-400">
            See below our main three plans for your business, for your startup and agency.
          </p>
          <p class="text-sm font-normal text-inherit-400">
            It start from here! You can teach yourself what you really like.
          </p>
        </div>

        <section className="flex flex-col items-center justify-center mt-12 space-y-6 md:mt-20">
          {/* Bill Toggle */}
          <TogglePlan toggleBillingPlan={toggleBillingPlan} billPlan={billPlan} />

          {/* Plans */}
          <div className="grid grid-cols-1 gap-8 laptop:grid-cols-2">
            {!loading
              ? subscriptions?.[billPlan]?.map((plan, index) => (
                  <PlanCard
                    key={index}
                    name={plan?.name}
                    description={plan?.planDescription}
                    price={plan?.price}
                    priceId={plan?.priceId}
                    noOfModelsAllowed={plan?.noOfModelsAllowed}
                    billingPeriod={billPlan}
                  />
                ))
              : new Array(2).fill(null).map(() => <PlanCardSkeleton />)}
          </div>
        </section>
      </main>
    </>
  );
};
export default Pricing;
