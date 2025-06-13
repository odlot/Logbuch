import type { Log } from '../models/Log';

type EditorProps = {
    log?: Log
};

export default function Editor({ log }: EditorProps) {
    return (
        <div>
            {log ? (
                <div>
                    {log.filename}
                </div>
            ) : (
                <div>
                    Editor
                </div>
            )}
        </div>
    );
}