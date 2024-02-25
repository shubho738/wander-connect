
import {siteConfig} from '@/config/site'
import LayoutHeader from '../LayoutHeader/LayoutHeader'
import LeftSidebar from '@/components/layouts/LeftSidebar/LeftSidebar'
import RightSidebar from '../RightSidebar/RightSidebar'
import styles from './MainLayout.module.scss'

interface MainLayoutProps {
  children: React.ReactNode;
  pageBanner?: string;
  back?: boolean;
  showLatestJournals?: boolean;
  customContentContainerStyles?: React.CSSProperties;
}

const MainLayout = ({children, pageBanner, back, showLatestJournals = true, customContentContainerStyles}: MainLayoutProps) => {

  return (
    <div
      className={styles["main-layout"]}
    >

      <LeftSidebar />

      <div
        className="container"
      >
        <div
          className={styles["main-layout__container"]}
        >
          <div
            className={styles["main-layout__header"]}
          >
            <LayoutHeader
              pageBanner={pageBanner ?? siteConfig?.title}
              back={back}
            />
          </div>

          <div
            className={styles["main-layout__body"]}
          >
            <div
              style={customContentContainerStyles}
              className={styles["main-layout__main"]}
            >
              {children}
            </div>

            <div
              className={styles["main-layout__right-sidebar"]}
            >
              <RightSidebar
                showLatestJournals={showLatestJournals}
              />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default MainLayout