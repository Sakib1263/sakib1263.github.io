const repository = 'https://github.com/Sakib1263/Unimodal-3D-Kinetics-Estimation-from-Insole-or-IMU';
const version = 'v0.1.0';

export const kinetics = {
  slug: 'wearable-foot-kinetics',
  repository,
  version,
  release: `${repository}/releases/tag/${version}`,
  verificationPath: `kinetics-${version}-demo-verification.json`,
  dataGuide: `${repository}/blob/${version}/docs/DATA_CONTRACT.md`,
  dataUrl: 'https://doi.org/10.5281/zenodo.7422031',
  clone: `git clone --branch ${version} --single-branch ${repository}.git\ncd Unimodal-3D-Kinetics-Estimation-from-Insole-or-IMU`,
  demo: 'python -m pip install -r requirements.txt\npython -m kinetics demo --config configs/insole.json',
  inspect: 'python -m kinetics inspect --config configs/insole.json',
};
