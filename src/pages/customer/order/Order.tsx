import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import ChooseDestination from '../../../components/customer/order/ChooseDestination';
import ShipmentDetails from '../../../components/customer/order/ShipmentDetails';
import RequiredDocuments from '../../../components/customer/order/RequiredDocuments';
import DeliveryOptions from '../../../components/customer/order/DeliveryOptions';
import PlaceOrder from '../../../components/customer/order/PlaceOrder';
import PaymentConfirmation from '../../../components/customer/order/PaymentConfirmation';
import SideDrawer from '../../../components/shared/SideDrawer';
import componentTransitionAnimation from '../../../common/animations/componentTransitionAnimation';

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

    const [currentStep, setCurrentStep] = useState(0);

    const handleStepClick = (stepIndex: number) => {
        setCurrentStep(stepIndex);
        console.log('Step clicked:', stepIndex);
    };

    const pageTransition = {
        in: {
            opacity: 1,
            x: 0,
            scale: 1
        },
        out: {
            opacity: 0,
            x: "-100%",
            scale: 0.8
        }
    };

    const stepsComponents = [
        <ChooseDestination key={0} goNext={() => setCurrentStep(1)} />,
        <ShipmentDetails key={1} goNext={() => setCurrentStep(2)} goBack={() => setCurrentStep(0)} />,
        <RequiredDocuments key={2} goNext={() => setCurrentStep(3)} goBack={() => setCurrentStep(1)} />,
        <DeliveryOptions key={3} goNext={() => setCurrentStep(4)} goBack={() => setCurrentStep(2)} />,
        <PlaceOrder key={4} goNext={() => setCurrentStep(5)} goBack={() => setCurrentStep(3)} />,
        <PaymentConfirmation key={5} finishOrder={() => setCurrentStep(6)} goBack={() => setCurrentStep(4)} />,
    ];

    return (
        <div>
            <SideDrawer steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />
            <AnimatePresence>
                <motion.div
                    key={currentStep}
                    {...componentTransitionAnimation}
                    variants={pageTransition}
                >
                    {stepsComponents[currentStep]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default Order
