import { Input, Select, SelectItem, Textarea } from "@nextui-org/react"
import React, { useContext, useEffect, useMemo, useState } from "react"
import { conditionDataType, conditionType } from "../../../types/ConditionTypes"
import CodeMirror from "@uiw/react-codemirror"
import { python } from "@codemirror/lang-python"
import { noctisLilac } from "@uiw/codemirror-theme-noctis-lilac"
import { andromeda } from "@uiw/codemirror-theme-andromeda"
import { themeContext } from "../../../contexts/themeContext"

const PythonCondition = ({
  condition,
  setData,
}: {
  condition: conditionType
  setData: React.Dispatch<React.SetStateAction<conditionType>>
}) => {
  const { theme } = useContext(themeContext)

  useEffect(() => {
    if (!condition.data.python) {
      setData({
        ...condition,
        type: "python",
        data: {
          ...condition.data,
          python: {
            action: `def ${condition.name}(ctx: Context, pipeline: Pipeline) -> bool:\n# enter your python condition:\nreturn True`,
          },
        },
      })
    }
  }, [])

  const changeConditionValue = (value: string) => {
    setData({
      ...condition,
      type: "python",
      data: {
        ...condition.data,
        python: {
          action: value,
        },
      },
    })
  }
  return (
    <>
      <p className='text-sm font-medium'>Action</p>
      <div
        className={`mt-2 w-full flex flex-col items-start justify-start gap-4 p-4 ${theme === "light" ? "bg-[#f2f1f8]" : "bg-[#24262e]"} rounded-lg`}>
        <CodeMirror
          lang='python'
          extensions={[python()]}
          value={condition.data.python?.action}
          onChange={changeConditionValue}
          className='w-full border-none outline-none focus-within:outline-none focus:outline-none'
          theme={theme === "light" ? noctisLilac : andromeda}
          height='240px'
        />
      </div>
    </>
  )
}

export default PythonCondition
