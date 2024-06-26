import { Drawer, HeaderImage, Step, StepIndicator } from "@app_styles/shared/sideDrawer.styles";
import logo from "@app_assets/images/logo.png"

type SideDrawerProps = {
    steps: string[];
    currentStep: number;
    // onStepClick: (stepIndex: number) => void;
}

// const SideDrawer: React.FC<SideDrawerProps> = ({ steps, currentStep, onStepClick }) => {
const SideDrawer: React.FC<SideDrawerProps> = ({ steps, currentStep }) => {
    return (
        <Drawer>
            <HeaderImage src={logo}></HeaderImage>
            <div style={{ padding: '2rem 0', backgroundColor: '#FFFFFF55', margin: '1rem .5rem', borderRadius: '15px' }}>
                {steps.map((step, index) => (
                    // <Step key={step} isActive={index === currentStep} onClick={() => onStepClick(index)}>
                    <Step key={step} isActive={index === currentStep}>
                        <StepIndicator isActive={index === currentStep} />
                        {step}
                    </Step>
                ))}
            </div>
        </Drawer>
    );
};

export default SideDrawer;
