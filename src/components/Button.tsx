import {
  Button as MuiButton,
  ButtonProps,
  makeStyles
} from "@material-ui/core";

interface IButtonProps extends ButtonProps {
  fontSize?: "small" | "medium" | "large";
  danger?: string;
  confirm?: string;
}

const useStyles = makeStyles({
  small: {
    fontSize: "0.7em"
  },
  medium: {
    fontSize: "1.0em"
  },
  large: {
    fontSize: "1.4em"
  }
});

function Button({ fontSize = "medium", children, ...rest }: IButtonProps) {
  const classes = useStyles();
  return (
    <MuiButton classes={{ label: classes[fontSize] }} {...rest}>
      {children}
    </MuiButton>
  );
}

export default Button;