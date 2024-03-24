import React, { useEffect, useState } from 'react';
import PlanCard from './PlanCard';
import TogglePlan from './TogglePlan';
import axiosInstance from 'services/axiosInstance';
import PlanCardSkeleton from './PlanCardSkeleton';
import { useSelector } from 'react-redux';

const Main = ({ seller }) => {
  const [billPlan, setBillPlan] = useState('monthly');
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, tokens } = useSelector((state) => state.auth);

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
    <main className="mx-4 my-32">
      <div className="text-center">
        <h1 className="mb-4 text-600 font-normal tablet:text-800 laptop:text-900">
          Our <span className="font-semibold">plans</span> for your <span className="font-semibold">strategies</span>
        </h1>
        <p className="text-sm font-normal text-inherit-400">
          See below our main three plans for your business, for your startup and agency.
        </p>
        <p className="text-sm font-normal text-inherit-400">
          It start from here! You can teach yourself what you really like.
        </p>
      </div>

      <section className="flex flex-col items-center justify-center mt-12 space-y-6 md:mt-20">
        <div className="grid grid-cols-1 gap-8 tablet:grid-cols-2 laptop:grid-cols-3">
          {/* Bill Toggle */}
          <div className="flex justify-end tablet:col-span-2 laptop:col-span-3 ">
            <TogglePlan toggleBillingPlan={toggleBillingPlan} billPlan={billPlan} />
          </div>
          {/* Plans */}
          {!loading
            ? subscriptions?.[billPlan]?.map((plan, index) => (
                <PlanCard
                  key={index}
                  userId={user?.id || null}
                  tokens={tokens}
                  planId={plan._id}
                  name={plan?.name}
                  description={plan?.planDescription}
                  price={plan?.price}
                  priceId={plan?.priceId}
                  noOfModelsAllowed={plan?.noOfModelsAllowed}
                  billingPeriod={billPlan}
                  seller={seller}
                />
              ))
            : new Array(3).fill(null).map(() => <PlanCardSkeleton />)}
        </div>
      </section>
    </main>
  );
};

export default Main;
