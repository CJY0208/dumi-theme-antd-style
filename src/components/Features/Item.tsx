import { ArrowRightOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { Link } from 'dumi';
import { type FC } from 'react';
import { Center, Flexbox } from 'react-layout-kit';

import { IFeature } from '../../types';
import { useStyles } from './Item.style';

const FeatureItem: FC<IFeature> = ({
  imageType,
  row,
  column,
  hero,
  description,
  image,
  title,
  link,
}) => {
  const rowNum = row || 7;
  const { styles, theme } = useStyles(rowNum);

  return (
    <div
      className={styles.container}
      style={{
        gridRow: `span ${rowNum}`,
        gridColumn: `span ${column || 1}`,
        cursor: link ? 'pointer' : 'default',
      }}
      onClick={() => {
        if (!link) return;

        window.open(link);
      }}
    >
      <div className={styles.cell}>
        {image && (
          <Center image-style={imageType} className={styles.imgContainer}>
            <img className={styles.img} src={image} alt={title} />
          </Center>
        )}
        {title && (
          <Flexbox as={'h3'} horizontal gap={8} align={'center'} className={styles.title}>
            {title}
            {imageType === 'soon' ? (
              <Tag
                color={theme.isDarkMode ? 'pink-inverse' : 'cyan-inverse'}
                // style={{ border: 'none' }}
              >
                SOON
              </Tag>
            ) : null}
          </Flexbox>
        )}
        {description && (
          <p dangerouslySetInnerHTML={{ __html: description }} className={styles.desc} />
        )}
        {link && (
          <div className={styles.link}>
            <Link to={link}>
              立即了解 <ArrowRightOutlined />
            </Link>
          </div>
        )}
      </div>
      {hero && <div className={styles.blur} />}
    </div>
  );
};

export default FeatureItem;