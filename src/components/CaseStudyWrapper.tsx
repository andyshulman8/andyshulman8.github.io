import { useParams, useNavigate } from 'react-router-dom';
import CaseStudyTemplate from '../pages/logs';

/**
 * CaseStudyWrapper Component
 * 
 * Routing & URL Logic:
 * - Uses the 'viewToIndex' mapping to translate URL slugs (e.g., /logs, /alerts) 
 *   into numerical indices for the 'allCaseStudies' data array [18, 19].
 * - Validates the 'caseId' parameter to ensure only existing projects are 
 *   loaded, redirecting invalid routes to the home page [19, 20].
 * 
 * State & Navigation:
 * - 'initialStop' logic: Extracts the 'stopIndex' from the URL to allow 
 *   deep-linking directly into a specific part of a case study journey [19, 20].
 * - Handlers: Manages 'onNextRoute' to sequence the user through projects 
 *   in a specific "transit" order [20, 21].
 */

const viewToIndex: Record<string, number> = { 
  logs: 0, alerts: 1, data: 2, team: 3, future: 4, health: 5 
};

export default function CaseStudyWrapper() {
  const { caseId, stopIndex } = useParams<{ caseId: string; stopIndex?: string }>();
  const navigate = useNavigate();

  const validCases = ['logs', 'alerts', 'data', 'team', 'future', 'health'];
  
  if (!caseId || !validCases.includes(caseId)) {
    navigate('/', { replace: true });
    return <div>Loading...</div>;
  }

  const dataIndex = viewToIndex[caseId];
  
  // If stopIndex exists in URL, we're viewing a stop; otherwise overview
  const initialStop = stopIndex ? Math.max(0, parseInt(stopIndex, 10) - 1) : undefined;

  return (
    <CaseStudyTemplate
      dataIndex={dataIndex}
      initialStop={initialStop}
      onBack={() => navigate('/')}
      onNextRoute={() => {
        const order = ['logs', 'alerts', 'data', 'team', 'future', 'health'];
        const currentIdx = order.indexOf(caseId);
        const nextCase = order[(currentIdx + 1) % order.length];
        navigate(`/${nextCase}`);
      }}
      onStopChange={(idx) => navigate(`/${caseId}/${idx + 1}`, { replace: true })}
      onOverview={() => navigate(`/${caseId}`, { replace: true })}
    />
  );
}

