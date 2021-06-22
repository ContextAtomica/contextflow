import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import S3 from "react-aws-s3";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const config = {
  bucketName: "contextflow",
  dirName: "image" /* optional */,
  region: "us-east-2",
  accessKeyId: "AKIAZJZHX25X4IFATH6E",
  secretAccessKey: "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",
};
const UploadImage = ({ setEntityImage }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    setLoading(true);
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(e.target.files[0], e.target.files[0].name)
      .then((data) => {
        setLoading(false);
        setEntityImage(data.location);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  return (
    <div>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleUpload}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
    </div>
  );
};
export default UploadImage;
