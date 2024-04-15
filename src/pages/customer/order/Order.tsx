// import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import ChooseDestination from '@app_components/customer/order/ChooseDestination';
import ShipmentDetails from '@app_components/customer/order/ShipmentDetails';
import RequiredDocuments from '@app_components/customer/order/RequiredDocuments';
import DeliveryOptions from '@app_components/customer/order/DeliveryOptions';
import PlaceOrder from '@app_components/customer/order/PlaceOrder';
import PaymentConfirmation from '@app_components/customer/order/PaymentConfirmation';
import SideDrawer from '@app_components/shared/SideDrawer';
import componentTransitionAnimation from '@app_common/animations/componentTransitionAnimation';
import pageTransitionAnimation from '@app_common/animations/pageTransitionAnimation';
import useSessionStorage from '@app_hooks/useSessionStorage';

const Order = () => {

    const steps = [
        'Choose Destination',
        'Shipment',
        'Required Documents',
        'Delivery Options',
        'Place Order',
        'Confirm Payment',
        'Status',
    ];

    // const [currentStep, setCurrentStep] = useState(0);
    const [currentStep, setCurrentStepInState] = useSessionStorage('current-step', 0);

    const setCurrentStep = (step) => {
        setCurrentStepInState(step);
    };

    const [restrictedOrder, setRestrictedOrder] = useSessionStorage('order-is-restricted-order');

    const handleStepClick = (stepIndex: number) => {
        setCurrentStep(stepIndex);
    };

    const stepsComponents = [
        <ChooseDestination key={0} goNext={() => setCurrentStep(1)} />,
        <ShipmentDetails key={1} goNext={(isRestricted) => {
            setRestrictedOrder(isRestricted);
            setCurrentStep(isRestricted ? 2 : 3)
        }}
            goBack={() => setCurrentStep(0)}
        />,
        <RequiredDocuments key={2} goNext={() => setCurrentStep(3)} goBack={() => setCurrentStep(1)} />,
        <DeliveryOptions key={3} goNext={() => setCurrentStep(4)}
            goBack={() => {
                    setCurrentStep(restrictedOrder ? 2 : 1)
                }
            }
        />,
        <PlaceOrder key={4} goNext={() => setCurrentStep(5)} goBack={() => setCurrentStep(3)} />,
        <PaymentConfirmation key={5} finishOrder={() => setCurrentStep(6)} goBack={() => setCurrentStep(4)} />,
    ];

    return (
        <>
            <SideDrawer steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />
            <AnimatePresence>
                <motion.div
                    key={currentStep}
                    {...componentTransitionAnimation}
                    variants={pageTransitionAnimation}
                >
                    {stepsComponents[currentStep]}
                </motion.div>
            </AnimatePresence>
        </>
    );
}

export default Order
