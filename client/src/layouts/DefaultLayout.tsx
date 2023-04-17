import PageNavigation from '../components/blocks/PageNavigation';
import PageFooter from '../components/blocks/PageFooter';

interface IProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: IProps) => (
  <>
    <PageNavigation />
    {children}
    <PageFooter />
  </>
);

export default DefaultLayout;
