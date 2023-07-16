import { FC } from 'react';
import bgImage from '../../assets/bg.png'

const imageStyle: React.CSSProperties = {
  backgroundImage: `url(${bgImage})`,
  backgroundPosition: "left top",
  backgroundColor: '#271A43',
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "100vh",
  width: "100vw",
}

const Layout: FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
  return (
    <main style={imageStyle} className={className}>
      {children}
    </main>
  );
};

export default Layout;
