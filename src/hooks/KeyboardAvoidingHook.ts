import { useEffect, useState } from "react"
import { Keyboard } from "react-native"
// import { Keyboard } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export const useKeyboardAvoidingBottomPadding = (): string => {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
    const { bottom } = useSafeAreaInsets()
  
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', () => setIsKeyboardVisible(true))
      const keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', () => setIsKeyboardVisible(false))
      return () => {
        keyboardDidHideListener.remove()
        keyboardDidShowListener.remove()
      }
    }, [])
  
    return isKeyboardVisible || !bottom ? '16px' : `${bottom}px`
  }