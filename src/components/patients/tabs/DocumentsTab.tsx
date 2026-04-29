import Card from '../../common/Card';
import Button from '../../common/Button';

export default function DocumentsTab() {
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h3 className="font-semibold">Documents & Reports</h3>
        <Button>Upload New Document</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="text-4xl">📄</div>
            <div>
              <p className="font-medium">SpO2 Report</p>
              <p className="text-sm text-gray-500">May 24, 2026</p>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button variant="outline" size="sm">Download</Button>
            <Button variant="danger" size="sm">Delete</Button>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="text-4xl">📋</div>
            <div>
              <p className="font-medium">Care Plan</p>
              <p className="text-sm text-gray-500">May 20, 2026</p>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button variant="outline" size="sm">Download</Button>
            <Button variant="danger" size="sm">Delete</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}