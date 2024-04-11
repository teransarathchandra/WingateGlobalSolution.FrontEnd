import { Drawer, HeaderImage, Step, StepIndicator } from "@app_styles/shared/sideDrawer.styles";
import logo from "@app_assets/images/logo.png"

type SideDrawerProps = {
    steps: string[];
    currentStep: number;
    onStepClick: (stepIndex: number) => void;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ steps, currentStep, onStepClick }) => {
    return (
        <Drawer>
            <HeaderImage src={logo}></HeaderImage>
            <div style={{ padding: '2rem 0', backgroundColor: '#FFFFFF77', margin: '1rem .5rem', borderRadius: '15px' }}>
                {steps.map((step, index) => (
                    <Step key={step} isActive={index === currentStep} onClick={() => onStepClick(index)}>
                        <StepIndicator isActive={index === currentStep} />
                        {step}
                    </Step>
                ))}
            </div>
        </Drawer>
    );
};

export default SideDrawer;
