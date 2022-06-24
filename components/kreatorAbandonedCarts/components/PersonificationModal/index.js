import { useState } from "react";
import { Input, Modal, Typography, Button } from "antd";
import FilteredPersonification from "../FilteredPersonification";
import { emailTags } from "../../data/formData";
import styles from "./index.module.scss";

const { Title, Text } = Typography;

const PersonificationModal = ({
  personificationModal,
  setPersonificationModal,
  handlePersonification,
}) => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(null);
  const [personifications, setPersonifications] = useState([]);

  const handleChange = e => {
    const { value } = e.target;

    if (filtered && value === "") {
      setFiltered(null);
    }

    setSearch(value.toLowerCase());
  };

  const handleEnterKey = () => {
    const tempArr = emailTags.filter(({ name }) => {
      return name.toLowerCase().includes(search);
    });

    setFiltered(tempArr);
  };

  const addPersonifications = () => {
    let str = "";

    personifications.forEach(personification => {
      str = `${str}{${personification}} `;
    });

    handlePersonification(str.trimEnd());
    setPersonificationModal(false);
  };

  return (
    <Modal
      title="Personification"
      visible={personificationModal}
      footer={null}
      mask={false}
      onCancel={() => setPersonificationModal(false)}
    >
      <div className={styles.search__wrapper}>
        <Input
          placeholder="Search"
          size="large"
          value={search}
          onChange={handleChange}
          onPressEnter={handleEnterKey}
          allowClear
        />
      </div>
      <div className={styles.email__tags__container}>
        <Title level={3}>Email Tags</Title>
        <div className={styles.email__tags}>
          {filtered && filtered.length === 0 ? (
            <div className={styles.no__data}>
              <Text type="secondary" italic strong>
                No Email Tags Found
              </Text>
            </div>
          ) : filtered ? (
            <FilteredPersonification
              data={filtered}
              personifications={personifications}
              setPersonifications={setPersonifications}
            />
          ) : (
            <FilteredPersonification
              data={emailTags}
              personifications={personifications}
              setPersonifications={setPersonifications}
            />
          )}
        </div>
        <div className={styles.add__button}>
          <Button
            disabled={personifications.length === 0}
            onClick={addPersonifications}
          >
            Add
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PersonificationModal;
