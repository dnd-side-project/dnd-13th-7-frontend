'use client'

import React, { useState } from 'react'
import {
  Control,
  useFieldArray,
  FieldValues,
  ArrayPath,
  Path,
} from 'react-hook-form'
import { Textarea } from '@/components/atoms/Textarea'
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/molecules/Form'
import { cn } from '@/shared/utils/cn'

interface DynamicQASectionProps<T extends FieldValues> {
  control: Control<T>
  name: ArrayPath<T>
  title: string
  questionPlaceholder: string
  answerPlaceholder: string
}

export default function DynamicQASection<T extends FieldValues>({
  control,
  name,
  title,
  questionPlaceholder,
  answerPlaceholder,
}: DynamicQASectionProps<T>) {
  const { fields, append } = useFieldArray({
    control,
    name,
  })
  const [focusedField, setFocusedField] = useState<{
    index: number
    field: 'question' | 'answer'
  } | null>(null)

  const handleAddQuestion = () => {
    append({ question: '', answer: '' } as T[ArrayPath<T>])
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1">
        <h3 className="typo-body-1-b text-black-color">{title}</h3>
        <span className="text-primary-color">*</span>
      </div>

      {fields.map((field, index) => {
        const questionValue = control._formValues[name]?.[index]?.question || ''
        const answerValue = control._formValues[name]?.[index]?.answer || ''
        const isQuestionFocused =
          focusedField?.index === index && focusedField?.field === 'question'
        const isAnswerFocused =
          focusedField?.index === index && focusedField?.field === 'answer'

        const getQuestionLabelColor = () => {
          if (isQuestionFocused) return 'text-main-color-1'
          if (questionValue) return 'text-grey-color-5'
          return 'text-grey-color-1'
        }

        const getAnswerLabelColor = () => {
          if (isAnswerFocused) return 'text-main-color-1'
          if (answerValue) return 'text-grey-color-5'
          return 'text-grey-color-1'
        }

        return (
          <div
            key={field.id}
            className="border border-grey-color-1 rounded-lg overflow-hidden"
          >
            <FormField
              control={control}
              name={`${name}.${index}.question` as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-start gap-2 p-4 border-b border-grey-color-2">
                      <span
                        className={cn(
                          'typo-body-2-sb transition-colors',
                          getQuestionLabelColor(),
                        )}
                      >
                        Q.
                      </span>
                      <Textarea
                        {...field}
                        placeholder={questionPlaceholder}
                        className="min-h-6 border-none p-0 resize-none focus-visible:ring-0"
                        onFocus={() =>
                          setFocusedField({ index, field: 'question' })
                        }
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`${name}.${index}.answer` as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-start gap-2 p-4">
                      <span
                        className={cn(
                          'typo-body-2-sb transition-colors',
                          getAnswerLabelColor(),
                          !questionValue && 'text-grey-color-1',
                        )}
                      >
                        A.
                      </span>
                      <Textarea
                        {...field}
                        placeholder={answerPlaceholder}
                        className="min-h-[60px] border-none p-0 resize-none focus-visible:ring-0"
                        disabled={!questionValue}
                        onFocus={() =>
                          setFocusedField({ index, field: 'answer' })
                        }
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )
      })}

      <button
        type="button"
        onClick={handleAddQuestion}
        className="w-full py-3 bg-grey-color-1 rounded-lg text-primary-color typo-button-m hover:bg-grey-color-2 transition-colors"
      >
        + 문항 추가
      </button>
    </div>
  )
}
