import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-primary_text">
      <h1 className="text-2xl font-bold mb-6">개인정보 처리방침</h1>
      <p>
        이 개인정보 처리방침은 링크-버킷(Link-Bucket) 웹 페이지 및 Chrome 확장
        프로그램(이하 "서비스")에 적용되며, 이는 애니멀-스쿼드(Animal-Squad,
        이하 "서비스 제공자")에 의해 무료로 제공됩니다. 본 서비스는 "있는
        그대로" 제공됩니다.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">정보 수집 및 사용</h2>
      <p>서비스는 다음과 같은 정보를 수집할 수 있습니다:</p>
      <ul className="list-disc pl-6">
        <li>사용자의 IP 주소</li>
        <li>
          서비스 내 방문한 페이지, 방문 시간 및 날짜, 해당 페이지에서 머문 시간
        </li>
        <li>사용자의 브라우저 유형 및 버전</li>
        <li>서비스 사용 시간</li>
      </ul>
      <p className="mt-4">
        서비스 제공자는 Google API를 활용하여 정보를 수집 및 처리할 수 있습니다.
        Google API를 사용하는 경우, 해당 데이터는 Google의 개인정보 처리방침 및
        보안 정책에 따라 관리됩니다. 자세한 내용은{" "}
        <a
          href="https://policies.google.com/privacy"
          className="text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google 개인정보처리방침
        </a>
        을 참고하시기 바랍니다.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">개인정보 제공 목적</h2>
      <p>
        서비스 제공자는 사용자에게 다음과 같은 목적으로 정보를 제공받거나 사용할
        수 있습니다:
      </p>
      <ul className="list-disc pl-6">
        <li>서비스 개선 및 오류 모니터링</li>
        <li>사용자 문의에 대한 응답</li>
        <li>중요 공지사항, 필수 알림 및 서비스 관련 정보 제공</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-4">제3자 접근</h2>
      <p>
        서비스 제공자는 본 개인정보 처리방침에 명시된 경우에 한하여 정보를
        제3자와 공유할 수 있습니다:
      </p>
      <ul className="list-disc pl-6">
        <li>법적 요구가 있는 경우 (예: 법원 명령, 소환장 등)</li>
        <li>
          사용자의 안전 보호, 사기 조사 및 정부 요청에 대응하기 위해 필요하다고
          판단되는 경우
        </li>
        <li>
          신뢰할 수 있는 서비스 제공자와 정보를 공유하며, 이들은 독립적으로
          정보를 사용할 수 없고 본 방침을 준수해야 합니다.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-4">Google API 활용</h2>
      <p>
        서비스는 Google API를 통해 데이터를 처리하며, 이는 Google API의{" "}
        <strong>서비스 약관</strong> 및 <strong>사용 제한</strong>을 준수합니다.
        Google API를 통해 수집된 데이터는 사용자 동의 없이 외부로 전송되지
        않으며, 서비스 제공자는 Google API 데이터를 보호하기 위한 적절한 보안
        조치를 취하고 있습니다.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">옵트아웃 권리</h2>
      <p>
        사용자는 언제든 Chrome 확장 프로그램을 삭제하거나 웹 서비스 이용을
        중단하여 정보 수집을 중단할 수 있습니다. Chrome 확장 프로그램은 브라우저
        설정 메뉴를 통해 쉽게 삭제할 수 있습니다.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">데이터 보존 정책</h2>
      <p>
        서비스 제공자는 사용자가 서비스를 이용하는 동안 및 합리적인 기간 동안
        데이터를 보관합니다. 사용자가 제공한 데이터를 삭제하려면{" "}
        <a
          href="mailto:linkbucket422@gmail.com"
          className="text-blue-500 underline"
        >
          linkbucket422@gmail.com
        </a>
        으로 문의해 주시기 바랍니다.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">아동 보호</h2>
      <p>
        서비스는 13세 미만의 아동을 대상으로 하지 않으며, 고의로 13세 미만
        아동으로부터 개인정보를 수집하지 않습니다. 만약 13세 미만 아동의 정보
        수집 사실을 알게 된다면 이를 즉시 삭제하겠습니다.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">보안</h2>
      <p>
        서비스 제공자는 사용자의 데이터를 안전하게 보호하기 위해 물리적, 전자적,
        절차적 보안 조치를 유지하고 있습니다.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">변경 사항</h2>
      <p>
        본 개인정보 처리방침은 필요에 따라 업데이트될 수 있습니다. 변경 사항은
        이 페이지를 통해 공지되며, 변경 후에도 서비스를 계속 이용할 경우 변경된
        방침에 동의한 것으로 간주됩니다.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4">문의</h2>
      <p>
        서비스 사용 중 개인정보와 관련된 문의사항은{" "}
        <a
          href="mailto:linkbucket422@gmail.com"
          className="text-blue-500 underline"
        >
          linkbucket422@gmail.com
        </a>
        으로 연락 주시기 바랍니다.
      </p>

      <p className="mt-8 text-gray-500">**시행일**: 2024년 11월 15일</p>
    </div>
  );
};

export default PrivacyPolicy;
