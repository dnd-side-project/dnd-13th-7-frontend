module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 새로운 기능 추가
        'fix', // 오류 수정 - 기능 상 변경(개선or수정), 롤백의 단위
        'bug', // 기능상의 오류
        'docs', // 문서 관련 수정
        'style', // CSS 관련
        'refactor', // 코드의 리팩터링(기능 상 변경 x)
        'chore', // 잡다한 수정사항
        'build', // 빌드 혹은 패키지 매니저 수정사항
        'test', // test 코드 삽입 및 수정
        'comment', // 필요한 주석 추가 및 변경
      ],
    ],
    'type-case': [2, 'always', 'lowercase'],
    'type-empty': [2, 'never'],
    'subject-case': [2, 'always', 'lowercase'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
  },
}
