import PageNavigation from '../components/blocks/PageNavigation';

interface IProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: IProps) => (
  <>
    <PageNavigation />
    {children}
  </>
);

export default DefaultLayout;
