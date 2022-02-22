import Image from "next/image";
import { Typography, Button } from "antd";
import { MdOutlineCloudDownload } from "react-icons/md";
import FileImg from "public/images/success_file.png";
import ClipboardImg from "public/images/clipboards.png";
import styles from "./index.module.scss";

const { Text } = Typography;

const PromotionalMaterials = () => {
  return (
    <section className={styles.container}>
      {true ? (
        <div className={styles.materials}>
          <div>
            <Image src={FileImg} alt="File image" />
          </div>
          <p>
            <Text>The Kreator has this materials for you </Text>
          </p>
          <p>
            <Text>
              Here is a promotional material that will help you in marketing the
              product
            </Text>
          </p>
          <div>
            <Button size="large" type="primary" block>
              Download File&nbsp;&nbsp; <MdOutlineCloudDownload />
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.no_materials}>
          <div>
            <Image src={ClipboardImg} alt="Clipboard image" />
          </div>
          <Text>No materials was uploaded </Text>
        </div>
      )}
    </section>
  );
};

export default PromotionalMaterials;
