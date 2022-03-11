import React from "react";
import { Button } from "antd";
import axios from "axios";
import { CSVLink } from "react-csv";
import { BsDownload } from "react-icons/bs";
import { showToast } from "utils";
import styles from "./index.module.scss";

/*  AsyncDataToCSV Component receives 3.props:
  1 - this.props.url = link to the resource, an array of data, to be converted to downloadable CSV

  2 - this.props.headers = The CSV file headers. Format below:
  const headers = [
    { label: "Product Name", key: "product_name" },
    { label: "Product Type", key: "product_type" },
    { label: "Product Price", key: "product_price" },
    { label: "Date Created", key: "date_created" },
  ];

  3 - this.props.filename = The default name of the csv file.
*/

export default class AsyncDataToCSV extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
    };

    this.csvRef = React.createRef();
  }

  getData = async link => {
    try {
      this.setState({ loading: true });

      const response = await axios.get(link);
      return response.data;
    } catch {
      return null;
    } finally {
      this.setState({ loading: false });
    }
  };

  downloadCSV = async () => {
    const data = await this.getData(this.props.url);

    if (!data) {
      showToast("Could not download CSV. Try again later", "error");
      return;
    }

    this.setState({ data: data.data }, () => {
      setTimeout(() => {
        this.csvRef.current.link.click();
      });
    });
  };

  render() {
    const { data, loading } = this.state;
    const { headers, filename } = this.props;

    return (
      <>
        <div className={styles.csvDataDownload}>
          <Button type="link" onClick={this.downloadCSV} loading={loading}>
            Export data in CSV &nbsp;
            <BsDownload />
          </Button>
        </div>
        <CSVLink
          headers={headers}
          filename={`${filename}.csv`}
          data={data}
          ref={this.csvRef}
        />
      </>
    );
  }
}
