import { Ionicons } from '@expo/vector-icons'
import { Button, Input } from '@rneui/themed'
import { StyleSheet, View } from 'react-native'

const Form = props => {
  const { onInputChange, onSubmit } = props
  return (
    <View style={styles.formContainer}>
      <View style={{ ...styles.formItems, ...styles.input }}>
        <Input
          leftIcon={<Ionicons name='search' />}
          placeholder='Beef, pork, chicken'
          onChangeText={value => onInputChange(value)}
        />
      </View>
      <View style={styles.formItems}>
        <Button
        color='primary'
        type='solid'
        onPress={onSubmit}
        >
          Search
        </Button>
      </View>
    </View>
  )
}

export default Form

const styles = StyleSheet.create({
  formContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: 20
  },
  formItems: {
    display: 'inline-flex'
  },
  input: {
    width: '65%'
  }
})
