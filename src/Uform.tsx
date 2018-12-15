import React from 'react'
import NumberFormat from 'react-number-format'

// Material UI
import { createStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import { Theme } from '@material-ui/core/styles/createMuiTheme'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ArrowForward from '@material-ui/icons/ArrowForward'
import Check from '@material-ui/icons/Check'
import Clear from '@material-ui/icons/Clear'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 300,
      paddingTop: theme.spacing.unit * 3
    },
    header: {
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: theme.spacing.unit * 2,
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3
    },
    label: {
      marginTop: theme.spacing.unit * 3,
      color: 'grey'
    },
    field: {
      fontSize: '2em'
    },
    valid: {
      color: 'green'
    },
    invalid: {
      color: 'red'
    },
    spacer: {
      flexGrow: 1
    },
    bottom: {
      paddingLeft: theme.spacing.unit * 3,
      color: 'white'
    },
    submit: {
      backgroundColor: 'red',
      color: 'white'
    },
    footer: {
      marginTop: theme.spacing.unit * 3,
      backgroundColor: '#EF9A9A'
    }
  })

interface UformProps {
  classes: {
    root?: string
    header?: string
    form?: string
    label?: string
    field?: string
    valid?: string
    invalid?: string
    bottom?: string
    submit?: string
    spacer?: string
    footer?: string
  }
  minIncome: number
  minSavings: number
  handleSubmit: Function
}

interface UformState {
  income: number
  savings: number
  [field: string]: number
}

function NumberFormatCustom(props: any) {
  const { inputRef, onChange, ...other } = props
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        })
      }}
      decimalScale={0}
      thousandSeparator
      allowNegative={false}
      isAllowed={values =>
        Boolean(parseInt(values.value)) || values.value.length === 0
      }
    />
  )
}

class Uform extends React.Component<UformProps, UformState> {
  constructor(props: UformProps) {
    super(props)
    this.state = {
      income: 0,
      savings: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (fieldName: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ [fieldName]: parseInt(event.target.value) })
  }

  handleSubmit = () => {
    if (this.isFormValid()) {
      this.props.handleSubmit(this.state.income, this.state.savings)
    }
  }

  isFormValid() {
    return Boolean(
      this.state.income > this.props.minIncome &&
        this.state.savings > this.props.minSavings
    )
  }

  render() {
    const label = (fieldName: string, fieldLabel: string) => (
      <InputLabel htmlFor={fieldName} key={`${fieldName}-label`}>
        <Typography variant="subtitle1" className={this.props.classes.label}>
          {fieldLabel}
        </Typography>
      </InputLabel>
    )

    const field = (fieldName: string, minAmount: number) => (
      <Input
        className={this.props.classes.field}
        id={fieldName}
        key={`${fieldName}-field`}
        onChange={this.handleChange(fieldName)}
        fullWidth={true}
        inputComponent={NumberFormatCustom}
        startAdornment={
          <InputAdornment position="start">
            <Typography variant="h4">£</Typography>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            {this.state[fieldName] >= minAmount ? (
              <Check className={this.props.classes.valid} />
            ) : (
              <Clear className={this.props.classes.invalid} />
            )}
          </InputAdornment>
        }
      />
    )

    return (
      <Paper className={this.props.classes.root} elevation={3}>
        <Grid container>
          <form>
            <Grid item className={this.props.classes.header} xs={12}>
              <Typography variant="h6" gutterBottom>
                Tell us about you
              </Typography>
              <Typography variant="body2" gutterBottom>
                Sharing your household income and your savings for a home will
                help us find suitable homes for you.
              </Typography>
            </Grid>
            <Grid item xs={12} className={this.props.classes.form}>
              {label('income', 'Your household income')}
              {field('income', this.props.minIncome)}
              {label('savings', 'Your savings')}
              {field('savings', this.props.minSavings)}
            </Grid>
            <Grid item className={this.props.classes.footer} xs={12}>
              <Grid container justify="flex-end" alignItems="center">
                <Grid item>
                  <Typography
                    className={this.props.classes.bottom}
                    variant="h6">
                    Find your next home
                  </Typography>
                </Grid>
                <Grid item className={this.props.classes.spacer} />
                <Grid item>
                  <Button
                    className={this.props.classes.submit}
                    variant="text"
                    disabled={!this.isFormValid()}
                    onClick={this.handleSubmit}>
                    <ArrowForward />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Paper>
    )
  }
}

export default withStyles(styles)(Uform)
