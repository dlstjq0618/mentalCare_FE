import { rem } from "polished";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Div,
  RegisterFormSection,
  TermsLinkIcon,
  TermsCheckbox,
  TermsDialog,
  FormFieldErrorMessage,
  Article,
} from "~/components";

const TERMS_HTML2 = `
<header><h1 class="page-title" style="text-align: center;height: 2em;">이용약관</h1></header>
<div style="height: 10px"></div>
<p style="margin-left: 20px;">우주약방 및 우주약방 심리상담 관련 서비스의 이용과 관련하여 필요한 사항을 규정합니다.</p>
<p style="margin-left: 20px;"></p>
<p><strong>제 1조(목적)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">이 이용약관(이하 "약관"이라 합니다)은 ㈜코레시옹비탈레(이하 "회사"라 합니다)가 제공하는 우주약방 및 우주약방 관련 제반 서비스(이하 "우주약방" 또는 "서비스")의 이용과 관련하여 회사와 회원과의 권리, 의무 및 책임사항, 서비스의 이용조건 및 절차, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
<p style="margin-left: 20px;"></p>
<p><strong>제 2 조 (정의)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1."서비스"라 함은 구현되는 단말기(PC, 휴대형단말기 등의 각종 유무선 장치를 포함)와 상관없이 우주약방 브랜드명으로 회사가 제공하는 제반 서비스를 의미합니다.</p>
<p style="margin-left: 20px;">2."이용자"는 이 약관에 따라 회사가 제공하는 서비스를 이용하는 “회원” 및 “비회원”을 의미합니다.</p>
<p style="margin-left: 20px;">3."회원"이라 함은 이 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 의미하며, “일반회원”, “병원회원”, “약국회원”, “심리상담회원”을 포함합니다.</p>
<p style="margin-left: 20px;">4."일반회원"이라 함은 이 약관에 동의하고, 일반회원의 양식에 따라 서비스 가입을 완료한 고객을 말합니다.</p>
<p style="margin-left: 20px;">5."병원회원"이라 함은 이 약관에 동의하고, 병원회원의 양식에 따라 서비스 가입을 완료한 고객을 말합니다.</p>
<p style="margin-left: 20px;">6."약국회원"이라 함은 이 약관에 동의하고, 약국회원의 양식에 따라 서비스 가입을 완료한 고객을 말합니다.</p>
<p style="margin-left: 20px;">7.“심리상담회원”이라 함은 이 약관에 동의하고, 심리상담회원의 양식에 따라 서비스 가입을 완료한 고객을 말합니다.</p>
<p style="margin-left: 20px;">8."비회원"이라 함은 이용 계약을 체결하지 않고 회사가 제공하는 서비스를 이용하는 자를 말합니다.</p>
<p style="margin-left: 20px;">9."닉네임"이라 함은 회원의 식별과 서비스 이용을 위하여 회원이 정하고 회사가 승인하는 문자와 숫자 등을 의미합니다.</p>
<p style="margin-left: 20px;">10."비밀번호"라 함은 회원이 부여 받은 아이디와 일치되는 회원임을 확인하고 비밀 보호를 위해 회원 자신이 정한 문자 또는 숫자의 조합을 의미합니다.</p>
<p style="margin-left: 20px;">11."게시물"이라 함은 회원이 회사가 제공하는 서비스에 게시 또는 등록하는 부호, 문자, 음성, 음향, 화상, 동영상 등의 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등을 말합니다.</p>
<p style="margin-left: 20px;">12.유료서비스: 일반회원이 회사 또는 병원/약국/심리상담회원에게 일정한 대가를 지급하고 회사 또는 병원/약국/심리상담회원으로부터 받는 모든 서비스를 의미합니다.</p>
<p style="margin-left: 20px;">13.이 약관에서 사용하는 용어 중 본항에서 정하지 아니한 것은 관계 법령 및 서비스별 안내에서 정하는 바에 따르며, 그 외에는 일반 관례에 따릅니다.</p>
<p style="margin-left: 20px;"></p>
<p><strong>제 3 조 (서비스의 종류)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.회사가 제공하는 서비스는 다음과 같습니다.</p>
<p style="margin-left: 30px;">1) 비대면 진료 플랫폼 개발 및 운영 서비스 (이하 “비대면 진료 플랫폼 서비스”)</p>
<p style="margin-left: 30px;">2) 건강상담 플랫폼 개발 및 운영 서비스 (이하 “건강상담 플랫폼 서비스”)</p>
<p style="margin-left: 30px;">3) 비대면 약조제/배송 플랫폼 개발 및 운영 서비스 (이하 “약배송 플랫폼 서비스”) (상기 1)~3)의 서비스를 통칭하여 “비대면 플랫폼 서비스”라 합니다.)</p>
<p style="margin-left: 30px;">4) 비대면 진료 및 건강상담 업무지원 서비스</p>
<p style="margin-left: 30px;">5) 비대면 약조제/배송 업무지원 서비스</p>
<p style="margin-left: 30px;">6) 광고/이벤트/프로모션 집행 서비스</p>
<p style="margin-left: 30px;">7) 이용자(환자) 지원 서비스</p>
<p style="margin-left: 30px;">8) 병원/약국 정보검색 서비스</p>
<p style="margin-left: 30px;">9) 건강 관련 상품의 판매, 중개 등 전자상거래 서비스</p>
<p style="margin-left: 30px;">10) 심리상담 업무지원 서비스</p>
<p style="margin-left: 30px;">11) 기타 회사가 추가 개발하거나 다른 회사와의 제휴계약 등을 통해 회원에게 제공하는 일체의 서비스</p>
<p style="margin-left: 20px;">2.서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다. 다만, 회사는 서비스를 일정범위로 분할하여 각 범위 별로 이용가능시간을 별도로 지정할 수 있으며, 이러한 경우에는 그 내용을 사전에 공지합니다. 또한 비대면 진료시 담당 의사가 부재 중인 경우에는 비대면 진료가 불가능 할 수 있고 심리상담사 또한 부재 중인 경우 상담이 불가할 수 있습니다.</p>
<p style="margin-left: 20px;">3.회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절 또는 운영상 상당한 이유가 있는 경우 서비스의 제공을 일시적으로 중단할 수 있습니다. 이 경우 회사는 제13조 (회원에 대한 통지)에 정한 방법으로 회원에게 통지합니다. 다만, 회사가 사전에 통지할 수 없는 부득이한 사유가 있는 경우 사후에 통지할 수 있습니다.</p>
<p style="margin-left: 20px;">4.회사는 서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며, 정기점검시간은 서비스제공화면에 공지한 바에 따릅니다.</p>
<p style="margin-left: 20px;">5.회사는 서비스의 개편 등 운영상 상당한 이유가 있는 경우 또는 기술상의 필요에 따라 제공하고 있는 전부 또는 일부 서비스를 변경하거나 제공을 중단할 수 있습니다.</p>
<p style="margin-left: 20px;">6.서비스의 내용, 이용방법, 이용시간에 대하여 변경이 있는 경우에는 변경사유, 변경될 서비스의 내용 및 제공일자 등은 그 변경 전에 해당 내용을 게시하여야 합니다.</p>
<p style="margin-left: 20px;">7.회사는 무료로 제공되는 서비스의 일부 또는 전부를 회사의 정책 및 운영의 필요상 수정, 중단, 변경할 수 있으며, 이에 대하여 관련 법령에 특별한 규정이 없는 한 회원에게 별도의 보상을 하지 않습니다.</p>
<p style="margin-left: 20px;">8.비대면 플랫폼 서비스는 감염병의 예방 및 관리에 관한 법률 등 관련 법령 및 정부 정책의 변경에 따라 예고 없이 중단될 수 있으며, 회사는 이에 대해 아무런 책임을 지지 않습니다.</p>
<p style="margin-left: 20px;">9.회사는 상담사와 내담자간의 상담환경을 조성 (내담자와 상담을 위한 안심번호 연결, 채팅 서비스 제공) 합니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 4 조 (약관의 게시와 개정)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.회사는 이 약관의 내용을 회원이 쉽게 알 수 있도록 회원가입 화면에 게시합니다.</p>
<p style="margin-left: 20px;">2.회사는 사이트에 수정된 조항을 게시함으로써 언제든 본 약관을 수정할 수 있습니다. 다른 곳에 명시하지 않는 이상 모든 수정된 조항은 최초 게시 이후 14일 후에 자동적으로 효력이 발생합니다. 다만, 회원에게 불리한 약관의 개정의 경우에는 개정약관의 적용일자 30일 전에 공지하거나 서비스 내 전자우편, 전자쪽지, 로그인시 동의창 등의 전자적 수단을 통해 따로 명확히 통지하도록 합니다. 위와 같은 공지 또는 통지에도 불구하고 변경된 약관에 대한 정보를 알지 못해 발생하는 회원의 피해는 회사에서 책임지지 않습니다.</p>
<p style="margin-left: 20px;">3.약관이 변경된 이후에 회원이 회사의 서비스를 계속 이용하는 경우에는 개정된 약관에 동의하는 것으로 봅니다. 개정된 약관에 동의하지 않을 경우 회원 탈퇴(해지)를 요청할 수 있습니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 5 조 (약관 외 준칙 및 관련 법령과의 관계)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.회사는 필요한 경우 서비스 내의 개별항목에 대하여 개별약관 또는 운영원칙(이하 "서비스별 안내"라 합니다)을 정할 수 있으며, 이 약관과 서비스별 안내의 내용이 상충되는 경우에는 서비스별 안내의 내용을 우선하여 적용합니다.</p>
<p style="margin-left: 20px;">2.이 약관 또는 서비스별 안내에서 정하지 않은 사항은 관련 법령의 규정과 일반적인 상관례에 의합니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 6 조 (이용 계약의 성립)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.이용계약은 회원이 되고자 하는 자(이하 "가입신청자")가 약관의 내용에 동의를 하고, 회사가 정한 가입 양식에 따라 회원정보 (아이디, 비밀번호, 이름, 연락처, 전자우편주소, 휴대폰번호 등)를 기입하여 회원가입신청을 하고 회사가 이러한 신청에 대하여 승낙함으로서 체결됩니다.</p>
<p style="margin-left: 20px;">2.회사는 가입신청자의 신청에 대하여 서비스 이용을 승낙함을 원칙으로 합니다. 다만, 회사는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다.</p>
<p style="margin-left: 30px;">1) 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우</p>
<p style="margin-left: 30px;">2) 타인의 명의 혹은 전화번호를 이용하거나 이미 가입된 회원과 전화번호를 통한 본인인증 기관의 본인증 고유한 아이디가 기존 회원과 동일한 경우</p>
<p style="margin-left: 30px;">3) 허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우 등 이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우</p>
<p style="margin-left: 30px;">4) 부정한 용도 또는 영리를 추구할 목적으로 본 서비스를 이용하고자 하는 경우</p>
<p style="margin-left: 30px;">5) 기타 관계 법령 또는 이 약관에 위배되거나 사회의 질서 혹은 미풍양속을 저해할 수 있는 등 위법 또는 부당한 목적으로 신청한 경우로서 회사가 합리적인 판단에 의하여 필요하다고 인정하는 경우</p>
<p style="margin-left: 20px;">3.제1항에 따른 신청에 있어 회사는 회원의 종류에 따라 전문기관을 통한 실명확인 및 본인인증을 요청할 수 있습니다.</p>
<p style="margin-left: 20px;">4.회사는 서비스 관련 설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다.</p>
<p style="margin-left: 20px;">5.제2항과 제4항에 따라 회원가입신청의 승낙을 하지 아니하거나 유보한 경우, 회사는 원칙적으로 이를 가입신청자에게 알리도록 합니다.</p>
<p style="margin-left: 20px;">6.이용계약의 성립 시기는 회사가 가입완료를 신청절차 상에서 표시한 시점으로 합니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 7 조 (이용 계약의 종료)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.회원의 해지</p>
<p style="margin-left: 30px;">1) 회원은 언제든지 회사에게 해지 의사를 통지하여 이용계약을 해지할 수 있습니다. (단, 상담 예정 이력이 없을 경우에 한해 해지 가능)</p>
<p style="margin-left: 30px;">2) 회사는 전항에 따른 회원의 해지 요청에 대해 특별한 사정이 없는 한 이를 즉시 처리합니다.</p>
<p style="margin-left: 30px;">3) 회원은 회사에게 해지 의사를 통지한 이후 회사가 정한 기간 동안 재가입에 제한을 받을 수 있습니다.</p>
<p style="margin-left: 20px;">2.회사의 해지</p>
<p style="margin-left: 30px;">1) 회사는 다음과 같은 사유가 있는 경우, 이용 계약을 해지할 수 있습니다. 이 경우 회사는 회원에게 전자우편, 전화, 팩스, 쪽지, 기타의 방법을 통하여 해지사유를 밝혀 해지의사를 통지합니다.</p>
<p style="margin-left: 30px;">가. 제6조 제2항에서 정하고 있는 이용계약의 승낙거부사유가 있음이 확인된 경우</p>
<p style="margin-left: 30px;">나. 회원이 회사나 다른 회원 기타 타인의 권리나 명예, 신용 기타 정당한 이익을 침해하는 행위를 한 경우</p>
<p style="margin-left: 30px;">다. 기타 회원이 이 약관에 위배되는 행위를 하거나 이 약관에서 정한 해지사유가 발생한 경우</p>
<p style="margin-left: 30px;">2) 이용계약은 회사가 해지의사를 회원에게 통지함으로써 종료됩니다.</p>
<p style="margin-left: 20px;">3.본조 제1항에 따라 회원이 임의로 이용계약을 종료 시키거나 제2항에 따라 회원의 귀책사유로 인하여 이용계약이 종료된 경우 발생한 손해는 이용계약이 종료된 해당 회원이 책임을 부담하여야 하고 회사는 일체의 책임을 지지 않습니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 8 조 (회원의 ID 및 비밀번호에 대한 의무)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.이용자ID 및 비밀번호의 관리책임은 회원에게 있습니다. 이를 소홀이 관리하여 발생하는 서비스 이용상의 손해 또는 제3자에 의한 부정이용 등에 대한 책임은 회원에게 있으며 회사는 그에 대한 책임을 지지 않습니다.</p>
<p style="margin-left: 20px;">2.회사는 회원의 아이디가 개인정보 유출 우려가 있거나, 회사가 정한 서비스 정책 및 운영방향에 어긋나거나, 반사회적 또는 미풍양속에 어긋나거나 회사 및 회사의 운영자로 오인한 우려가 있는 경우, 해당 아이디의 이용을 제한할 수 있습니다.</p>
<p style="margin-left: 20px;">3.회원은 아이디 및 비밀번호가 도용되거나 제3자가 사용하고 있음을 인지한 경우에는 이를 즉시 회사에 통지하고 회사의 안내에 따라야 합니다.</p>
<p style="margin-left: 20px;">4.제3항의 경우에 해당 회원이 회사에 그 사실을 통지하지 않거나, 통지한 경우에도 회사의 안내에 따르지 않아 발생한 불이익에 대하여 회사는 책임지지 않습니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 9 조 (회원, 이용자의 의무)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.회원은 관계 법령 및 이 약관의 규정, 회사의 정책, 이용안내 등 회사가 통지 또는 공지하는 사항을 준수하여야 하며, 기타 회사 업무에 방해되는 행위를 하여서는 안됩니다.</p>
<p style="margin-left: 20px;">2.회원은 서비스 이용과 관련하여 다음 각 호의 행위를 하여서는 안됩니다.</p>
<p style="margin-left: 30px;">1) 서비스 신청 또는 변경 시 허위내용의 등록</p>
<p style="margin-left: 30px;">2) 회사에 게시된 정보의 허가 받지 않은 변경</p>
<p style="margin-left: 30px;">3) 회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등)의 송신 또는 게시</p>
<p style="margin-left: 30px;">4) 회사 또는 제3자의 저작권 등 지적 재산권에 대한 침해</p>
<p style="margin-left: 30px;">5) 회사 또는 제3자의 명예를 손상시키거나 업무를 방해하는 행위</p>
<p style="margin-left: 30px;">6) 빈번한 구매취소 및 누적 등으로 타 회원의 서비스 이용을 방해할 우려가 있는 행위</p>
<p style="margin-left: 30px;">7) 고객센터 상담 내용이 욕설, 폭언, 성희롱 등에 해당하는 행위</p>
<p style="margin-left: 30px;">8) 자신의 ID, PW를 제3자에게 양도하거나 대여하는 등의 행위</p>
<p style="margin-left: 30px;">9) 정당한 사유 없이 회사의 영업을 방해하는 내용을 기재하는 행위</p>
<p style="margin-left: 30px;">10) 리버스엔지니어링, 디컴파일, 디스어셈블 및 기타 일체의 가공행위를 통하여 서비스를 복제, 분해 또 모방 기타 변형하는 행위</p>
<p style="margin-left: 30px;">11) 자동 접속 프로그램 등을 사용하는 등 정상적인 용법과 다른 방법으로 서비스를 이용하여 회사의 서버에 부하를 일으켜 회사의 정상적인 서비스를 방해하는 행위</p>
<p style="margin-left: 30px;">12) 기타 관계 법령에 위반된다고 판단되는 행위</p>
<p style="margin-left: 20px;">3.회원은 회사에서 공식적으로 인정한 경우를 제외하고는 서비스를 이용하여 상품을 판매하는 영업 활동을 할 수 없으며, 특히 해킹, 광고를 통한 수익활동, 음란사이트를 통한 상업행위, 상용소프트웨어 불법배포 등을 할 수 없습니다. 이를 위반하는 영업행위, 수익활동, 상업행위 등에 대하여 회사는 일체의 책임을 지지 않으며, 회원은 이와 같은 행위와 관련하여 회사에 발생한 손해를 배상할 의무를 집니다.</p>
<p style="margin-left: 20px;">4.회원은 등록정보에 변경사항이 발생할 경우 즉시 갱신하여야 합니다. 회원이 제공한 등록정보 및 갱신한 등록정보가 부정확할 경우 회원의 서비스 이용을 제한 또는 중지 할 수 있습니다.</p>
<p style="margin-left: 20px;">5.회원은 부적합한 (성희롱, 브로커, 장난) 등의 목적으로 상담 요청하는 내담자에 대해 회사 또는 경찰, 유관 기간에 신고하고 도움을 받을 수 있습니다.</p>
<p style="margin-left: 20px;">6.회원은 서비스 제공 과정에서 획득한 회원 정보와 상담 내용에 대해 비밀준수 의무를 지닌다.</p>
<p style="margin-left: 20px;">7.회원은 상담 관련 학과 석사 이상, 심리 상담 관련 자격증 (한국 상담 심리학회, 한국 상담학회, 한국 임상 심리학회 등) 필수 소지 자격 요건을 가진다.</p>
<p style="margin-left: 20px;">8.회원은 내담자가 제공하는 정보의 확인, 점검 및 상담, 조언이 가능하며 의료 행위에 해당하는 행위는 할 수 없다.</p>
<p style="margin-left: 20px;">9.회원은 고객의 개인정보를 업무 이외의 용도로 이용하거나 제 3자에게 제공, 누설하여서는 안되며 회원에 의하여 내담자의 개인정보가 유출된 경우 회원의 비용과 노력으로 회사를 면책해야한다.</p>
<p style="margin-left: 20px;">10.회원은 경영 노하우, 영업 규정 등 회사의 영업상 비밀을 계약 이행을 위한 업무 이외의 용도로 이용하거나 제 3자에게 제공, 누설하여서는 안되며, 계약이 종료된 후에도 이와 같다.</p>
<p style="margin-left: 20px;">- 각종 자료 (개인정보 포함)를 임의로 인쇄, 복사, 촬영, 분리, 반출하거나 제3자에게 대여 또는 공개하여 영업 비밀이 누설될 염려가 있는 일체의 행위가 포함됨.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 10 조 (회사의 의무)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.회사는 관계 법령과 이 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 계속적이고 안정적으로 서비스를 제공하기 위하여 최선을 다하여 노력합니다.</p>
<p style="margin-left: 20px;">2.회사는 회원이 안전하게 서비스를 이용할 수 있도록 개인정보(신용정보 포함)보호를 위해 개인정보취급방침을 수립하여 공시하고 준수합니다.</p>
<p style="margin-left: 20px;">3.회사는 회원으로부터 제기되는 의견이나 불만이 정당하다고 객관적으로 인정될 경우에는 적절한 절차를 거쳐 즉시 처리하여야 합니다. 다만, 즉시 처리가 곤란한 경우는 회원에게 그 사유와 처리일정을 통보하여야 합니다.</p>
<p style="margin-left: 20px;">4.회사는 관계 법령이 정한 의무사항을 준수합니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 11 조 (개인정보의 보호 및 사용)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.회사는 회원의 개인정보를 보호하기 위하여 관계 법령에서 정하는 바를 준수합니다.</p>
<p style="margin-left: 20px;">2.회사는 회원의 개인정보를 보호하기 위하여 개인정보처리방침을 제정, 서비스 내에 게시합니다. 다만, 개인정보처리방침의 구체적 내용은 연결화면을 통하여 볼 수 있습니다.</p>
<p style="margin-left: 20px;">3.회사는 개인정보처리방침에 따라 회원의 개인정보를 최대한 보호하기 위하여 노력합니다.</p>
<p style="margin-left: 20px;">4.회사는 회원가입 시 구매계약 이행에 필요한 정보를 미리 수집하지 않습니다. 다만, 관련 법령상 의무이행을 위하여 구매계약 이전에 본인확인이 필요한 경우로서 최소한의 특정 개인정보를 수집할 수 있습니다.</p>
<p style="margin-left: 20px;">5.회사가 정보를 중개하는 제3자 제공 "이벤트", “견적상담” 등 서비스에 입력한 회원의 개인정보에 대하여 회사는 해당 개인정보를 수집하는 주최자(병원, 약국, 상담사 등)로부터 그 처리업무를 위탁 받은 수탁자의 지위에서 개인정보 보호의무를 부담하는 바, 자세한 내용은 회사의 개인정보처리방침을 참고하시기 바랍니다. 다만, "이벤트", “견적상담” 등에 입력한 개인정보의 수집 및 이용과 관련하여 이를 수집하는 주최자(병원, 약국 등)의 개인정보처리방침을 확인할 책임은 회원 본인에게 있으며, 이를 확인하지 않음으로써 회원에게 발생한 불이익에 대하여 회사는 책임을 부담하지 않습니다.</p>
<p style="margin-left: 20px;">6.회사는 다음과 같은 경우에 법이 허용하는 범위 내에서 회원의 개인정보를 제3자에게 제공할 수 있습니다.1) 수사기관이나 기타 정부기관으로부터 정보제공을 요청 받은 경우</p>
<p style="margin-left: 30px;">2) 회원의 법령 또는 약관의 위반을 포함하여 부정행위 확인 등의 정보보호 업무를 위해 필요한 경우</p>
<p style="margin-left: 30px;">3) 기타 법률에 의해 요구되는 경우</p>
<p style="margin-left: 20px;">7.회사는 서비스 개선 및 회원 대상의 서비스 소개 등의 목적으로 회원의 동의 하에 관련 법령에 따라 추가적인 개인정보를 수집할 수 있습니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 12 조 (이용신청의 승낙과 제한)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.회사는 제 6조의 규정에 의한 이용신청에 대하여 업무 수행상 또는 기술상 지장이 없는 경우에 원칙적으로 접수순서에 따라 서비스 이용을 승낙합니다.</p>
<p style="margin-left: 20px;">2.회사는 아래사항에 해당하는 경우에 대해서 승낙을 보류할 수 있습니다.</p>
<p style="margin-left: 30px;">1) 본인의 진정한 정보를 제공하지 아니한 이용신청의 경우</p>
<p style="margin-left: 30px;">2) 법령 위반 또는 사회의 안녕과 질서, 미풍양속을 저해할 목적으로 신청한 경우</p>
<p style="margin-left: 30px;">3) 부정한 용도로 본 서비스를 이용하고자 하는 경우</p>
<p style="margin-left: 30px;">4) 영리를 추구할 목적으로 본 서비스를 이용하고자 하는 경우</p>
<p style="margin-left: 30px;">5) 회사가 제공하는 서비스와 동일 또는 유사한 서비스를 제공함으로써 경쟁관계에 있는 자와 일정한 관계에 있다고 판단되는 이용자가 신청하는 경우</p>
<p style="margin-left: 30px;">6) 법령 또는 약관을 위반하여 이용계약이 해지된 적이 있는 이용자가 신청하는 경우</p>
<p style="margin-left: 30px;">7) 기타 이 약관에서 규정한 제반 사항을 위반하며 신청하는 경우</p>
<p style="margin-left: 20px;">3.회사는 서비스 이용신청이 다음 각 호에 해당하는 경우에는 그 신청에 대하여 승낙 제한사유가 해소될 때까지 승낙을 유보할 수 있습니다.</p>
<p style="margin-left: 30px;">1) 회사가 설비의 여유가 없는 경우</p>
<p style="margin-left: 30px;">2) 회사의 기술상 지장이 있는 경우</p>
<p style="margin-left: 30px;">3) 기타 회사의 귀책사유로 이용승낙이 곤란한 경우</p>
<p style="margin-left: 20px;">4.회사는 이용신청고객이 관계 법령에서 규정하는 미성년자일 경우에 서비스별 안내에서 정하는 바에 따라 승낙을 보류할 수 있습니다.</p>
<p style="margin-left: 20px;">5.회사는 회원 가입 절차 완료 이후 제2항 각 호에 따른 사유가 발견된 경우 이용 승낙을 철회할 수 있습니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 13 조 (책임제한)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.회사는 비대면 플랫폼 서비스 제공자로서 원활한 비대면 진료, 건강상담, 약조제/배송, 심리상담을 위한 시스템 운영 및 관리 책임만을 부담할 뿐, 일반회원과 병원/약국회원, 상담사간의 진료, 건강상담, 약조제/배송 행위와 관련하여 분쟁이 발생한 경우 회사는 그 분쟁에 개입하지 않으며 그 분쟁의 결과로 인한 모든 책임은 회원이 부담합니다. 또한 이와 관련하여 회사가 제3자에게 손해를 배상하거나 기타 비용을 지출한 경우 회사는 회원에게 구상권을 행사할 수 있습니다.</p>
<p style="margin-left: 20px;">2.회사는 회원간 또는 회원과 제3자 상호간에 서비스를 매개로 하는 거래 등 행위로 인하여 분쟁이 발생한 경우에는 관련 법령에 별도의 정함이 없는 한 개입할 의무가 없고, 이로 인한 손해에 대하여 책임이 면제됩니다.</p>
<p style="margin-left: 20px;">3.회사는 회원이 서비스에 게재한 각종 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 대하여 책임을 지지 않으며, 회원이 서비스 내에 게시한 게시물이 타인의 저작권, 프로그램 저작권 등을 침해하거나 명예를 훼손하는 내용일 경우 이에 대한 민, 형사상의 책임을 부담하지 않습니다. 만일 회원이 타인의 저작권 침해, 명예 훼손을 이유로 회사가 타인으로부터 손해배상청구 등 이의 제기를 받은 경우 회원은 회사의 면책을 위하여 노력하여야 하며, 회사가 면책되지 못한 경우 회원은 그로 인해 회사에 발생한 모든 손해를 부담하여야 합니다.</p>
<p style="margin-left: 20px;">4.회사는 회원의 게시물을 등록 전에 사전심사 하거나 상시적으로 게시물의 내용을 확인 또는 검토하여야 할 의무가 없으며, 그 결과에 대한 책임을 지지 아니합니다.</p>
<p style="margin-left: 20px;">5.회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</p>
<p style="margin-left: 20px;">6.회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</p>
<p style="margin-left: 20px;">7.회사 및 회사의 임직원 그리고 대리인의 고의 또는 중대한 과실이 없는 한 다음과 같은 사항으로부터 발생하는 손해에 대해 책임을 지지 아니합니다.</p>
<p style="margin-left: 30px;">1) 회원 상태정보의 허위 또는 부정확성에 기인하는 손해</p>
<p style="margin-left: 30px;">2) 서비스에 대한 접속 및 서비스의 이용과정에서 발생하는 개인적인 손해</p>
<p style="margin-left: 30px;">3) 서버에 대한 제3자의 모든 불법적인 접속 또는 서버의 불법적인 이용으로부터 발생하는 손해</p>
<p style="margin-left: 30px;">4) 서버에 대한 전송 또는 서버로부터의 전송에 대한 제3자의 모든 불법적인 방해 또는 중단행위로부터 발생하는 손해</p>
<p style="margin-left: 30px;">5) 제3자가 서비스를 이용하여 불법적으로 전송, 유포하거나 또는 전송, 유포되도록 한 모든 바이러스, 스파이웨어 및 기타 악성 프로그램으로 인한 손해</p>
<p style="margin-left: 30px;">6) 전송된 데이터의 오류 및 생략, 누락, 파괴 등으로 발생되는 손해</p>
<p style="margin-left: 30px;">7) 회원간의 회원 상태정보 등록 및 서비스 이용 과정에서 발생하는 명예훼손 기타 불법행위로 인한 각종 민형사상 책임</p>
<p style="margin-left: 20px;">8.회사는 회원이 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며, 그 밖의 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.</p>
<p style="margin-left: 20px;">9.회사는 제3자가 서비스 내 화면을 통하여 광고한 이벤트, 병원 정보 등의 내용에 대하여 감시할 의무나 기타 어떠한 책임도 지지 아니하며 법에 위반되는 내용에 대해서는 제3자가 이에 대한 책임이 있습니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 14 조 (회원에 대한 통지)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.회사가 회원에 대한 통지를 하는 경우 이 약관에 별도 규정이 없는 한 서비스 내 쪽지, 알림, 문자 혹은 서비스 공지사항 등으로 할 수 있습니다.</p>
<p style="margin-left: 20px;">2.회사는 회원 전체에 대한 통지의 경우 7일 이상 회사의 게시판에 게시함으로써 제1항의 통지에 갈음할 수 있습니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 15조 (비대면 플랫폼 서비스)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.회사는 비대면 플랫폼 서비스 제공을 통해 우주약방 어플리케이션(앱) 상에서 회원이 다양한 형태로 비대면 진료, 건강상담, 약조제/배송, 심리상담 서비스 등을 제공받을 수 있도록 지원합니다.</p>
<p style="margin-left: 20px;">2.비대면 플랫폼 서비스는 관련 법령 및 정부 정책의 변경에 따라 예고 없이 중단될 수 있으며, 회사는 이에 대해 아무런 책임을 지지 않습니다.</p>
<p style="margin-left: 20px;">3.회사는 비대면 플랫폼 서비스 제공자로서 원활한 비대면 진료, 건강상담, 약조제/배송, 심리상담을 위한 시스템 운영 및 관리 책임만을 부담할 뿐, 일반회원과 병원/약국회원/상담사간의 진료, 건강상담, 심리상담, 약조제/배송 행위와 관련하여 분쟁이 발생한 경우 회사는 그 분쟁에 개입하지 않으며 그 분쟁의 결과로 인한 모든 책임은 회원이 부담합니다. 또한 이와 관련하여 회사가 제3자에게 손해를 배상하거나 기타 비용을 지출한 경우 회사는 회원에게 구상권을 행사할 수 있습니다.</p>
<p style="margin-left: 20px;">4.병원/약국/상담회원의 결제요청 후 일정 기간 내에 결제가 되지 않을 경우, 회사는 당해 진료/상담/약조제/심리상담 건을 회원의 동의 없이 취소할 수 있습니다.</p>
<p style="margin-left: 20px;">5.회사는 회원이 중복진료신청, 결제지연, 중복심리상담신청 등 비대면 플랫폼 서비스의 정상적인 운영을 방해한 경우, 의약품 오남용이 의심되는 경우 등 회사의 합리적인 판단에 의하여 필요하다고 인정하는 경우, 제30조 서비스 이용제한 및 제7조 이용 계약의 종료에 따른 조치를 취할 수 있습니다.</p>
<p style="margin-left: 20px;">6.회사는 회원의 비대면 플랫폼 서비스 이용 내역을 마이페이지에서 확인할 수 있도록 조치하며, 상담서비스 취소 방법 및 절차를 안내합니다.</p>
<p style="margin-left: 20px;">7.회사는 회원이 결제 시 사용한 결제수단에 대해 정당한 사용권한을 가지고 있는지의 여부를 확인할 수 있으며, 이에 대한 확인이 완료될 때까지 서비스 진행을 중지하거나, 확인이 불가한 해당 거래를 취소할 수 있습니다.</p>
<p style="margin-left: 20px;">8.비대면 플랫폼 서비스는 [전자상거래 등에서의 소비자보호에 관한 법률] 제 17조에 따라 진료/상담/약조제/심리상담 완료 후에는 원칙적으로 거래취소/환불이 불가합니다. 기타 사유로 취소/환불이 필요한 경우 고객센터를 통해 취소/환불 신청을 할 수 있습니다.</p>
<p style="margin-left: 20px;">9.이용자가 겪고 있는 증상이 경미한 증상이 아닌 경우, 상담중 본인 또는 타인의 생명이 위급한 상황에는 아래 기관에 즉시 도움을 요청해주시기 바랍니다.</p>
<p style="margin-left: 20px;">- 안전신고센터 : 119</p>
<p style="margin-left: 20px;">- 자살 예방 상담전화 : 1393</p>
<p style="margin-left: 20px;">- 청소년 전화 : 1388</p>
<p style="margin-left: 20px;">- 정신건강 위기상담 전화 : 1577-0199</p>
<p style="margin-left: 20px;">- 보건복지상담센터 : 129</p>
<p style="margin-left: 20px;">- 한국 생명의 전화 : 1588-9191</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 16조 (주문 및 결제)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.내담자는 회사가 제공하는 절차에 의하여 비대면 진료비, 처방약, 배송비, 심리상담비 등을 결제할수 있습니다. 단, 미성년 회원의 결제는 원칙적으로 보호자(법정대리인)의 명의 또는 동의 하에 이루어져야 합니다.</p>
<p style="margin-left: 20px;">2.미성년 회원이 유료 콘텐츠를 이용하고자 하는 경우에 보호자(법정대리인)이 그 계약에 대하여 동의하지 않거나 계약체결 후 추인을 하지 않으면 미성년 이용자 본인 또는 보호자가 그 계약을 취소할 수 있습니다. 다만, 민법 등에 따라 미성년 이용자가 단독으로 계약을 체결할 수 있는 경우에는 그러하지 않습니다.</p>
<p style="margin-left: 20px;">3.결제와 관련하여 회원이 입력한 정보 및 그 정보와 관련하여 발생한 책임과 불이익은 전적으로 내담자가 부담하여야 합니다.</p>
<p style="margin-left: 20px;">4.회사는 내담자의 결제 내용을 마이페이지에서 확인할 수 있도록 조치하며, 취소 방법 및 절차를 안내합니다.</p>
<p style="margin-left: 20px;">5.회사는 내담자가 결제 시 사용한 결제수단에 대해 정당한 사용권한을 가지고 있는지의 여부를 확인할 수 있으며, 이에 대한 확인이 완료될 때까지 계약 진행을 중지하거나, 확인이 불가한 해당 계약을 취소할 수 있습니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 17조 (청약의 철회)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.비대면 플랫폼 서비스1) 비대면 플랫폼 서비스는 [전자상거래 등에서의 소비자보호에 관한 법률] 제 17조에 따라 진료/상담/약조제/심리상담 완료 후에는 원칙적으로 거래취소/환불이 불가합니다.</p>
<p style="margin-left: 30px;">2) 그럼에도 불구하고, 서비스의 내용이 표시광고의 내용과 다르거나 계약 내용과 다르게 이행된 경우에는 서비스를 제공받은 날부터 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있습니다.</p>
<p style="margin-left: 30px;">3) 일반회원과 병원/약국회원 간 합의가 된 경우 전액 환불 가능합니다. 기타 사유로 취소/환불이 필요한 경우 고객센터를 통해 취소/환불 신청을 할 수 있습니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 18조 (결제 취소 및 환불 등)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.서비스 장애 또는 회사가 제시한 최소한의 기술사양을 충족하였음에도 불구하고 회사의 귀책사유로 서비스를 이용하지 못한 경우 절차에 따라 환불이 가능합니다.</p>
<p style="margin-left: 20px;">2.과오금이 발생한 경우, 회사는 회원에 대하여 이용대금의 결제와 동일한 방법으로 과오금 전액을 환불하여야 합니다.</p>
<p style="margin-left: 20px;">3.회사의 책임 있는 사유로 과오금이 발생한 경우 회사는 수수료에 관계없이 과오금 전액을 환불합니다. 다만, 회원의 책임 있는 사유로 과오금이 발생한 경우, 회사가 과오금을 환불하는 데 소요되는 비용은 회원이 부담하여야 합니다.</p>
<p style="margin-left: 20px;">4.회사는 회원이 주장하는 과오금에 대하여 환불을 거부할 경우에 정당하게 이용대금이 부과되었음을 입증할 책임을 집니다.</p>
<p style="margin-left: 20px;">5.저작권법, 컴퓨터프로그램보호법, 정보통신망법 등 각종 법령에 대한 중대한 불법행위 또는 사기, 버그 악용, 운영자 사칭 등 운영에 심각한 악영향을 미치는 행위를 한 것으로 판단되는 회원의 ID(계정) 이용을 제한하거나 해당 이용자와의 계약을 해지하는 경우는 환불하지 않을 수 있습니다. 단, 이용자가 중대한 불법행위 또는 운영에 심각한 악영향을 미치는 행위를 하지 않았음을 소명하는 경우는 그러하지 않습니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 19 조 (정보의 제공 및 광고의 게재)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.회사는 회원에게 서비스 이용에 필요가 있다고 인정되는 각종 정보에 대해서 전자우편이나 서신, 우편, SMS, 전화, 푸쉬알림, 알림톡 등의 방법으로 회원에게 제공할 수 있습니다.</p>
<p style="margin-left: 20px;">2.회사는 서비스의 운영과 관련하여 서비스 화면, 홈페이지에 광고를 게재할 수 있고, 회원의 동의가 있는 경우에는 전자우편, 쪽지, 문자, 푸쉬알림, 알림톡 등 전자적 전송매체를 이용하여 광고를 발송할 수 있습니다.</p>
<p style="margin-left: 20px;">3.회원은 회사가 제공하는 서비스와 관련하여 게시물 또는 기타 정보를 변경, 수정, 제한하는 등의 조치를 취하지 않습니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 20 조 (게시물의 관리)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.회원이 작성한 게시물로 인한 관련 법령 위반 등 모든 책임은 이를 게시한 회원에게 있습니다.</p>
<p style="margin-left: 20px;">2.회사는 회원이 게시하거나 등록하는 게시물의 내용이 다음 각 호에 해당한다고 판단되는 경우 해당 게시물을 삭제 또는 게시중단(임시조치)할 수 있습니다.</p>
<p style="margin-left: 30px;">1) 타인 또는 제3자를 비방하거나 명예를 손상시키는 내용인 경우</p>
<p style="margin-left: 30px;">2) 공공질서 및 미풍양속에 위반되는 내용일 경우</p>
<p style="margin-left: 30px;">3) 범죄적 행위에 결부된다고 인정되는 경우</p>
<p style="margin-left: 30px;">4) 회사의 저작권, 제3자의 저작권 등 기타 권리를 침해하는 내용인 경우</p>
<p style="margin-left: 30px;">5) 회원이 사이트와 게시판에 음란물을 게재하거나 음란사이트를 링크하는 경우</p>
<p style="margin-left: 30px;">6) 회사로부터 사전 승인 받지 아니한 상업광고, 판촉 내용을 게시하는 경우</p>
<p style="margin-left: 30px;">7) 회사가 제공하는 서비스와 관련 없거나, 타 경쟁업체가 제공하는 서비스의 내용인 경우</p>
<p style="margin-left: 30px;">8) 정당한 사유 없이 회사 또는 제3자의 영업을 방해하는 내용을 기재하는 경우</p>
<p style="margin-left: 30px;">9) 자신의 업소를 홍보할 목적으로 허위 또는 과장된 게시글을 게재하는 경우</p>
<p style="margin-left: 30px;">10) 영리를 목적으로 하는 광고일 경우</p>
<p style="margin-left: 30px;">11) 의미 없는 문자 및 부호에 해당하는 경우</p>
<p style="margin-left: 30px;">12) 제3자 등으로부터 권리침해신고가 접수된 경우</p>
<p style="margin-left: 30px;">13) 관계법령에 위반된다고 판단되는 경우</p>
<p style="margin-left: 30px;">14) 의료인 및 국내 의료기관 간의 비교 광고 성격을 띤다고 판단될 경우</p>
<p style="margin-left: 30px;">15) 허가 받지 않은 의료행위 또는 의료행위를 위한 선전으로 게시물을 게재할 경우</p>
<p style="margin-left: 30px;">16) 기타 회사에서 규정한 게시물 원칙에 어긋나거나, 게시판 성격에 부합하지 않는 경우</p>
<p style="margin-left: 20px;">3.회원의 게시물이 관련 법령 등에 위반되는 내용을 포함하는 경우, 회사는 관련 법령에 따라 필요한 조치를 취하여야 합니다.</p>
<p style="margin-left: 20px;">4.본 조에 따른 세부절차는 관련 법령이 규정한 범위 내에서 회사가 정한 게시중단 요청 절차에 따릅니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 21 조 (게시물의 저작권)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.회원이 서비스 내에 게시한 게시물의 저작권은 게시한 회원에게 귀속됩니다. 단, 회사는 서비스의 운영, 전시, 전송, 배포, 홍보의 목적으로 회원의 별도의 허락 없이 합리적인 범위 내에서 무상으로 다음과 같이 회원이 등록한 게시물을 사용할 수 있습니다. 단, 이 경우 회사가 회원의 이용자ID 외에 회원의 개인정보를 제공하기 위해서는 회원의 별도의 동의가 필요합니다.1) 서비스 내에서 회원 게시물의 복제, 수정, 개조, 전시, 전송, 배포 및 저작물성을 해치지 않는 범위 내에서의 편집 저작물 작성</p>
<p style="margin-left: 30px;">2) 미디어, 통신사 등 서비스 제휴 파트너에게 회원의 게시물 내용을 제공, 전시 혹은 홍보</p>
<p style="margin-left: 20px;">2.회사는 전항 이외의 방법으로 회원의 게시물을 이용하고자 하는 경우, 전화, 팩스, 전자우편 등의 방법을 통해 사전에 회원의 동의를 얻어야 합니다.</p>
<p style="margin-left: 20px;">3.회사와 회원간 이용계약을 회원이 해지하거나 회사가 적법한 사유로 해지한 경우 회사는 해당 회원이 게시하였으나 삭제하지 아니한 게시물을 삭제할 권한이 있습니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 22 조 (법정대리인의 권리)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.회사는 14세 미만의 회원에 대해서는 개인위치정보를 이용한 위치기반서비스 제공 및 개인위치정보의 제3자 제공에 대한 동의를 당해 회원과 당해 회원의 법정대리인으로부터 동의를 받아야 합니다. 이 경우 법정대리인은 제28조에 의한 회원의 권리를 모두 가집니다.</p>
<p style="margin-left: 20px;">2.회사는 14세 미만의 아동의 개인위치정보 또는 위치정보 이용 제공사실 확인자료를 이용약관에 명시 또는 고지한 범위를 넘어 이용하거나 제3자에게 제공하고자 하는 경우에는 14세 미만의 아동과 그 법정대리인의 동의를 받아야 합니다. 단, 아래의 경우는 제외합니다.</p>
<p style="margin-left: 30px;">1) 위치정보 및 위치기반서비스 제공에 따른 요금정산을 위하여 위치정보 이용, 제공사실 확인자료가 필요한 경우</p>
<p style="margin-left: 30px;">2) 통계작성, 학술연구 또는 시장조사를 위하여 특정 개인을 알아볼 수 없는 형태로 가공하여 제공하는 경우</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 23 조 (8세 이하의 아동 등의 보호의무자의 권리)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.회사는 아래의 경우에 해당하는 자(이하 “8세 이하의 아동 등”이라 합니다)의 보호의무자가 8세 이하의 아동 등의 생명 또는 신체보호를 위하여 개인위치정보의 이용 또는 제공에 동의하는 경우에는 본인의 동의가 있는 것으로 봅니다.</p>
<p style="margin-left: 30px;">1) 8세 이하의 아동</p>
<p style="margin-left: 30px;">2) 금치산자</p>
<p style="margin-left: 30px;">3) 법률 규정에 의한 중증장애인에 해당하는 자</p>
<p style="margin-left: 20px;">2.8세 이하의 아동 등의 생명 또는 신체의 보호를 위하여 개인위치정보의 이용 또는 제공에 동의를 하고자 하는 보호의무자는 서면동의서에 보호의무자임을 증명하는 서면을 첨부하여 회사에 제출하여야 합니다.</p>
<p style="margin-left: 20px;">3.보호의무자는 8세 이하의 아동 등의 개인위치정보 이용 또는 제공에 동의하는 경우 개인위치정보주체 권리의 전부를 행사할 수 있습니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 24 조 (서비스 이용제한)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.회사는 회원이 이 약관의 의무를 위반하거나 서비스의 정상적인 운영을 방해한 경우, 경고, 일시정지, 영구이용정지 등으로 서비스 이용을 단계적으로 제한할 수 있습니다.</p>
<p style="margin-left: 20px;">2.회사는 전항에도 불구하고, 명의도용 및 결제도용, 전화번호 도용, 불법프로그램의 제공 및 운영방해, 불법통신 및 해킹, 악성프로그램의 배포, 접속권한 초과행위 등과 같이 관련 법령을 위반한 경우에는 즉시 영구이용정지를 할 수 있습니다.</p>
<p style="margin-left: 20px;">3.회사는 다음 항목에 해당하는 행위를 발견할 시 서비스 이용에 제한을 둘 수 있습니다.</p>
<p style="margin-left: 30px;">1) 회원정보에 부정한 내용을 등록하거나 타인의 이용자ID, 비밀번호 기타 개인정보를 도용하는 행위 또는 이용자ID를 타인과 거래하거나 제공하는 행위</p>
<p style="margin-left: 30px;">2) 공공질서 및 미풍양속에 위반되는 저속, 음란한 내용 또는 타인의 명예나 프라이버시를 침해할 수 있는 내용의 정보, 문장, 도형, 음향, 동영상을 전송, 게시, 전자우편 또는 기타의 방법으로 타인에게 유포하는 행위</p>
<p style="margin-left: 30px;">3) 다른 이용자를 희롱 또는 위협하거나, 특정 이용자에게 지속적으로 고통 또는 불편을 주는 행위</p>
<p style="margin-left: 30px;">4) 회사로부터 특별한 권리를 부여 받지 않고 회사의 클라이언트 프로그램을 변경하거나, 회사의 서버를 해킹하거나, 웹사이트 또는 게시된 정보의 일부분 또는 전체를 임의로 변경하는 행위</p>
<p style="margin-left: 30px;">5) 서비스를 통해 얻은 정보를 회사의 사전 승낙 없이 서비스 이용 외의 목적으로 복제하거나, 이를 출판 및 방송 등에 사용하거나, 제 3자에게 제공하는 행위</p>
<p style="margin-left: 30px;">6) 회사의 운영진, 직원 또는 관계자를 사칭하거나 고의로 서비스를 방해하는 등 정상적인 서비스 운영에 방해가 될 경우</p>
<p style="margin-left: 30px;">7) 회사가 제공하는 서비스와 관련 없거나, 타 경쟁업체가 제공하는 서비스의 내용의 게시물을 게시할 경우</p>
<p style="margin-left: 30px;">8) 방송통신심의위원회 등 관련 공공기관의 시정 요구가 있는 경우</p>
<p style="margin-left: 30px;">9) 약관을 포함하여 회사가 정한 제반 규정을 위반하거나 범죄와 결부된다고 객관적으로 판단되는 등 제반 법령을 위반하는 행위</p>
<p style="margin-left: 20px;">4.본 조의 이용제한 범위 내에서 제한의 조건 및 세부내용은 회사의 이용제한정책에서 정하는 바에 의합니다.</p>
<p style="margin-left: 20px;">5.회원은 본 조에 따른 이용제한 등에 대해 회사가 정한 절차에 따라 이의신청을 할 수 있습니다. 이 때 이의가 정당하다고 회사가 인정하는 경우 회사는 즉시 서비스의 이용을 재개합니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 25 조 (손해배상)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.회사 또는 회원이 관련 법령 및 본 약관 등을 위반하여 상대방에게 손해가 발생하는 경우 귀책 당사자는 해당 손해를 배상해야 합니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 26 조 (권리의 귀속)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.서비스에 대한 저작권 및 지적재산권은 회사에 귀속됩니다. 즉, 회사가 제공하는 서비스의 디자인, 회사가 만든 텍스트, 스크립트(script), 그래픽, 회원 상호간 전송 기능 등 회사가 제공하는 서비스에 관련된 모든 상표, 서비스 마크, 로고 등에 관한 저작권 기타 지적재산권은 대한민국 및 외국의 법령에 기하여 회사가 보유하고 있거나 회사에게 소유권 또는 사용권이 있습니다. 단, 회원의 게시물 및 제휴계약에 따라 제공된 저작물 등은 제외합니다.</p>
<p style="margin-left: 20px;">2.회원은 이 약관으로 인하여 서비스를 소유하거나 서비스에 관한 저작권을 보유하게 되는 것이 아니라, 회사로부터 이용조건에 따른 계정, ID, 콘텐츠 등을 이용할 수 있는 서비스 이용권만을 허락 받으며, 회원은 이를 양도, 판매, 담보제공 등 처분할 수 없고, 정보취득을 위하여 개인용도로만 이용할 수 있습니다.</p>
<p style="margin-left: 20px;">3.회원은 명시적으로 허락된 내용을 제외하고는 서비스를 통해 얻어지는 회원 상태정보를 영리 목적으로 사용, 복사, 유통하는 것을 포함하여 회사가 만든 텍스트, 스크립트, 그래픽의 회원 상호간 전송기능 등을 복사하거나 유통할 수 없습니다.</p>
<p style="margin-left: 20px;">4.회원은 서비스를 이용함으로써 얻은 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 등 기타 방법에 의하여 영리 목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 27 조 (준거법 및 관할법원)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.서비스 이용과 관련하여 회사와 이용자 사이에 분쟁이 발생한 경우, 회사와 이용자는 분쟁의 해결을 위해 성실히 협의합니다.</p>
<p style="margin-left: 20px;">2.이 약관과 회사와 회원 간의 이용계약 및 회원 상호간의 분쟁에 대해 회사를 당사자로 하는 소송이 제기될 경우에는 회사의 본사 소재지를 관할하는 법원을 합의관할법원으로 정합니다.</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>제 28 조 (일반사항)</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.이 약관의 특정 조항이 유효하지 않거나 시행할 수 없는 경우 해당 조항은 효력이 중지되며 나머지 조항의 효력은 유효합니다. 제목은 단지 참고 목적이며 해당 조항의 영역이나 범위를 제한하지 않습니다. 회사가 회원 또는 타인의 위반 사항에 대해 대응하지 않는 것은 다음의 또는 유사한 위반 사항에 대해 대응할 권리를 포기하는 것을 의미하지 않습니다. 회사는 본 약관의 모든 위반에 대해 대응하는 것을 보증하지 않습니다.</p>
<p style="margin-left: 20px;">2.이 약관이 영문 약관과 상충되는 부분이 있을 경우에는 영문 약관이 우선합니다.</p>
<p style="margin-left: 20px;">3.중요 안내 사항 : 이용자가 겪고 있는 증상이 경미한 증상이 아닌 경우, 상담중 본인 또는 타인의 생명이 위급한 상황에는 아래 기관에 즉시 도움을 요청해주시기 바랍니다.</p>
<p style="margin-left: 20px;">- 안전신고센터 : 119</p>
<p style="margin-left: 20px;">- 자살 예방 상담전화 : 1393</p>
<p style="margin-left: 20px;">- 청소년 전화 : 1388</p>
<p style="margin-left: 20px;">- 정신건강 위기상담 전화 : 1577-0199</p>
<p style="margin-left: 20px;">- 보건복지상담센터 : 129</p>
<p style="margin-left: 20px;">- 한국 생명의 전화 : 1588-9191</p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;"></p>
<p><strong>[부칙]</strong></p>
<p style="margin-left: 20px;"></p>
<p style="margin-left: 20px;">1.이 약관은 2023년 1월 16일부터 적용됩니다.</p>
<p style="margin-left: 20px;">2.회사는 약관을 변경하는 경우에 회원이 그 변경 여부, 변경된 사항의 시행시기와 변경된 내용을 언제든지 쉽게 알 수 있도록 지속적으로 ‘서비스’를 통하여 공개합니다. 이 경우에 변경된 내용은 변경 전과 후를 비교하여 공개합니다.</p>

`

export const TermsForm = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [showTerms, setShowTerms] = useState<boolean>(false);

  return (
    <RegisterFormSection css={{ position: "relative" }}>
      <h2>약관 동의</h2>
      <Div
        css={{
          display: "flex",
          flex: "auto",
          a: { color: "$primary" },
        }}
      >
        <Div
          css={{
            flex: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input type="hidden" {...register("termsChecked")} />
          <TermsCheckbox
            css={{ marginRight: rem(17), cursor: "pointer" }}
            onCheckedChange={(c) =>
              setValue("termsChecked", c ? "true" : "false")
            }
          />
          <label htmlFor="terms">{"(필수)"}개인정보 수집 이용동의 약관</label>
          <Div role="button" onClick={() => setShowTerms(true)} style={{ color: "#999999", paddingLeft: "0.6rem" }}>
            약관보기
          </Div>
        </Div>
        <Div css={{ display: "flex", alignItems: "center", gap: rem(6) }}>
          <TermsDialog showDialog={showTerms} close={() => setShowTerms(false)}>
            <Article
              css={{
                height: "100%",
                overflow: "auto",
                paddingInlineEnd: rem(27),
                "&::-webkit-scrollbar": {
                  width: rem(3),
                },
                "&::-webkit-scrollbar-thumb": {
                  height: rem(58),
                  backgroundColor: "$white10",
                },
              }}
              dangerouslySetInnerHTML={{
                __html: TERMS_HTML2,
              }}
            />
          </TermsDialog>
        </Div>
      </Div>
      <Div
        css={{
          flex: "auto",
          // display: "flex",
          display: 'none',
          alignItems: "center",
        }}
      >
        <input type="hidden" {...register("termsChecked")} />
        <TermsCheckbox
          css={{ marginRight: rem(17), cursor: "pointer" }}
          onCheckedChange={(c) =>
            setValue("termsChecked", c ? "true" : "false")
          }
        />
        <label htmlFor="terms">{"(필수)"}우주약방은 파트너 병원과의 비대면 진료 과정에서 어떠한 수수료도 요구하지 않음을 확인 하였습니다.</label>
      </Div>
      <Div
        css={{
          flex: "auto",
          display: "none",
          // display: 'flex',
          alignItems: "center",
        }}
      >
        <input type="hidden" {...register("termsChecked")} />
        <TermsCheckbox
          css={{ marginRight: rem(17), cursor: "pointer" }}
          onCheckedChange={(c) =>
            setValue("termsChecked", c ? "true" : "false")
          }
        />
        <label htmlFor="terms">{"(필수)"}우주약방에서 의료인은 전공분야, 거리순으로 노출 되는 것에 동의 합니다.</label>
      </Div>
      {errors.termsChecked?.message && (
        <FormFieldErrorMessage
          css={{ position: "absolute", bottom: rem(4), left: rem(4) }}
        >
          {errors.termsChecked.message}
        </FormFieldErrorMessage>
      )}
    </RegisterFormSection>
  );
};
