'use client'

import Dialog from "../Dialog"
import ThemeChanger from "./ThemeChanger"

const ThemeChangerDialog = () => {

  return (
    <Dialog.Root identifier="themeChanger">
      <Dialog.Title>Themes</Dialog.Title>

      <ThemeChanger />

    </Dialog.Root>
  )
}

export default ThemeChangerDialog
