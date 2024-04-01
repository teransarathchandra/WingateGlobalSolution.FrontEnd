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
            {steps.map((step, index) => (
                <Step key={step} isActive={index === currentStep} onClick={() => onStepClick(index)}>
                    <StepIndicator isActive={index === currentStep} />
                    {step}
                </Step>
            ))}
        </Drawer>
    );
};

export default SideDrawer;
