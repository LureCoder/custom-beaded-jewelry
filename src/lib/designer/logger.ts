// logger.ts: Designer 调试日志 — 3D 渲染问题排查
const DEBUG = process.env.NODE_ENV === 'development';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const LOG_PREFIX = '[Designer]';

function formatTimestamp(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
}

function log(level: LogLevel, message: string, data?: Record<string, unknown>) {
  if (!DEBUG && level === 'debug') return;
  
  const timestamp = formatTimestamp();
  const prefix = `${LOG_PREFIX} ${timestamp}`;
  
  const logData = data ? JSON.stringify(data, null, 2) : '';
  
  switch (level) {
    case 'info':
      console.info(`${prefix} ${message}`, logData);
      break;
    case 'warn':
      console.warn(`${prefix} ${message}`, logData);
      break;
    case 'error':
      console.error(`${prefix} ${message}`, logData);
      break;
    case 'debug':
      console.debug(`${prefix} ${message}`, logData);
      break;
  }
}

export const logger = {
  info: (message: string, data?: Record<string, unknown>) => log('info', message, data),
  warn: (message: string, data?: Record<string, unknown>) => log('warn', message, data),
  error: (message: string, data?: Record<string, unknown>) => log('error', message, data),
  debug: (message: string, data?: Record<string, unknown>) => log('debug', message, data),
  
  materialChange: (fromId: string, toId: string) => {
    log('info', '🔄 材质切换', {
      from: fromId,
      to: toId,
      timestamp: Date.now(),
    });
  },
  
  beadCountChange: (from: number, to: number) => {
    log('info', '🔢 珠数变更', {
      from,
      to,
      diff: to - from,
    });
  },
  
  beadDiameterChange: (from: number, to: number) => {
    log('info', '📏 珠子直径变更', {
      from: `${from}mm`,
      to: `${to}mm`,
    });
  },
  
  priceCalculated: (config: {
    materialId: string;
    beadCount: number;
    beadDiameter: number;
    basePrice: number;
    diameterPrice: number;
    accessoryPrice: number;
    craftsmanshipFee: number;
    total: number;
  }) => {
    log('debug', '💰 价格计算', config);
  },
  
  beadPositionsCalculated: (count: number, circleRadius: number, positions: number) => {
    log('debug', '📍 珠子排列计算', {
      beadCount: count,
      circleRadius: circleRadius.toFixed(4),
      positionsGenerated: positions,
      spacerCount: Math.floor(count / 27),
    });
  },
  
  configUpdated: (config: Record<string, unknown>) => {
    log('debug', '⚙️ 配置更新', config);
  },
  
  accessoryAdded: (type: string, config: Record<string, unknown>) => {
    log('info', '✨ 配饰添加', { type, config });
  },
  
  accessoryRemoved: (type: string) => {
    log('info', '🗑️ 配饰移除', { type });
  },
  
  stateReset: () => {
    log('info', '🔄 配置重置');
  },
  
  renderError: (context: string, error: Error) => {
    log('error', `❌ 渲染错误: ${context}`, {
      errorMessage: error.message,
      errorStack: error.stack,
    });
  },
};
