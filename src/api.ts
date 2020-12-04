import { APISocket } from 'airdcpp-apisocket';

import { SeverityEnum, GroupedPath, ShareRoot, PostTempShareResponse } from './types/api';


export const API = (socket: APISocket) => {
  const getGroupedShareRoots = async (): Promise<GroupedPath[]> => {
    return socket.get(
      'share/grouped_root_paths'
    );
  };

  const validateSharePath = async (path: string, skipQueueCheck: boolean) => {
    return socket.post(
      'share/validate_path',
      {
        path,
        skip_check_queue: skipQueueCheck,
      }
    );
  };

  const getShareRoot = (id: string) => {
    return socket.get<ShareRoot>(`share_roots/${id}`);
  }

  const postEvent = async (text: string, severity: SeverityEnum) => {
    return socket.post(
      'events',
      {
        text,
        severity,
      }
    );
  };

  const postTempShare = (tempFileId: string, name: string) => {
    return socket.post<PostTempShareResponse>('share/temp_shares', {
      file_id: tempFileId,
      name,
    });
  };

  const deleteTempShare = (id: number) => {
    return socket.delete(`share/temp_shares/${id}`);
  };
  
  const createViewFile = (tth: string) => {
    return socket.post(`view_files/${tth}`, {
      text: true,
    });
  };

  return {
    getShareRoot,
    postEvent,
    getGroupedShareRoots,
    validateSharePath,

    postTempShare,
    deleteTempShare,
    createViewFile,
  };
};

export type APIType = ReturnType<typeof API>;
